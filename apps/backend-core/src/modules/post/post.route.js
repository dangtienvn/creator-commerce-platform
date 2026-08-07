const express = require('express');
const router = express.Router();
const PostController = require('./post.controller');
const { protect, authorize } = require('../../middlewares/auth.middleware');

router.get('/', PostController.getPosts);
router.get('/slug/:slug', PostController.getPostBySlug);
router.get('/tags', PostController.getTags);
router.get('/:id', PostController.getPostById);
router.post('/', protect, authorize("admin", "creator"), PostController.create);
router.put('/:id', protect, authorize("admin", "creator"), PostController.update);
router.delete('/:id', protect, authorize("admin", "creator"), PostController.delete);

module.exports = router;
