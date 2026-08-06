/**
 * @fileoverview Module Ä‘á»‹nh tuyáº¿n (router) cho cÃ¡c API xÃ¡c thá»±c ngÆ°á»i dÃ¹ng.
 * Cáº¥u hÃ¬nh cÃ¡c endpoint cho Ä‘Äƒng kÃ½, Ä‘Äƒng nháº­p, quÃªn máº­t kháº©u vÃ  Ä‘áº·t láº¡i máº­t 
 * kháº©u kÃ¨m theo cÃ¡c middleware kiá»ƒm tra dá»¯ liá»‡u há»£p lá»‡.
 */

const express = require("express");
const router = express.Router();

const AuthController = require("./auth.controller");
const { body } = require('express-validator');
const { authLimiter } = require('../../middlewares/rate-limiter');
const { runValidation } = require('../../middlewares/validation');

router.post(
	"/register",
	[
		body('name').notEmpty().withMessage('TÃªn lÃ  báº¯t buá»™c'),
		body('email').isEmail().withMessage('Email khÃ´ng há»£p lá»‡'),
		body('password')
			.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]).{8,}$/)
			.withMessage('Máº­t kháº©u pháº£i tá»« 8 kÃ½ tá»± trá»Ÿ lÃªn, chá»©a cáº£ chá»¯ cÃ¡i, chá»¯ sá»‘ vÃ  kÃ½ tá»± Ä‘áº·c biá»‡t')
	],
	runValidation,
	AuthController.register
);

router.post("/login", AuthController.login);

// refresh access token (reads refresh cookie or body/header)
router.post('/refresh', AuthController.refresh);

// logout (revoke refresh token)
router.post('/logout', AuthController.logout);

router.post(
	"/forgot",
	authLimiter,
	[body('email').isEmail().withMessage('Email khÃ´ng há»£p lá»‡')],
	runValidation,
	AuthController.forgot
);

router.post(
	"/reset",
	[
		body('token').notEmpty().withMessage('Token lÃ  báº¯t buá»™c'),
		body('password')
			.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]).{8,}$/)
			.withMessage('Máº­t kháº©u pháº£i tá»« 8 kÃ½ tá»± trá»Ÿ lÃªn, chá»©a cáº£ chá»¯ cÃ¡i, chá»¯ sá»‘ vÃ  kÃ½ tá»± Ä‘áº·c biá»‡t')
	],
	runValidation,
	AuthController.reset
);

// verify email link
router.get('/verify-email', AuthController.verifyEmail);
router.post('/verify-email', AuthController.verifyEmail);

module.exports = router;

