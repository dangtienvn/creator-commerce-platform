const jwt = require('jsonwebtoken');
const path = require('path');
const FileUploadUtils = require('../../utils/file-upload');

const FileController = {
  /**
   * API: /api/files/upload
   * Accepts multipart file uploads or base64 image payloads.
   * Returns one or more uploaded image URLs.
   */
  async upload(req, res, next) {
    try {
      const uploadedUrls = [];

      if (req.files && req.files.length) {
        for (const file of req.files) {
          const imageUrl = await FileUploadUtils.saveFileBuffer(file.buffer, file.originalname, file.mimetype);
          if (imageUrl) uploadedUrls.push(imageUrl);
        }
      }

      if (req.file && req.file.buffer) {
        const imageUrl = await FileUploadUtils.saveFileBuffer(req.file.buffer, req.file.originalname, req.file.mimetype);
        if (imageUrl) uploadedUrls.push(imageUrl);
      }

      if (!uploadedUrls.length && req.body.base64) {
        const base64Value = req.body.base64;
        if (Array.isArray(base64Value)) {
          for (const item of base64Value) {
            const imageUrl = await FileUploadUtils.saveBase64Image(item);
            if (imageUrl) uploadedUrls.push(imageUrl);
          }
        } else {
          const imageUrl = await FileUploadUtils.saveBase64Image(base64Value);
          if (imageUrl) uploadedUrls.push(imageUrl);
        }
      }

      if (!uploadedUrls.length) {
        return res.status(400).json({ success: false, message: 'No image data provided' });
      }

      return res.json({
        success: true,
        urls: uploadedUrls,
        url: uploadedUrls.length === 1 ? uploadedUrls[0] : undefined,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * API: /api/files
   * Deletes an image by its URL or list of URLs.
   */
  async delete(req, res, next) {
    try {
      const { url, urls } = req.body;
      const targets = [];
      if (Array.isArray(urls) && urls.length) {
        targets.push(...urls);
      }
      if (url) {
        targets.push(url);
      }

      if (!targets.length) {
        return res.status(400).json({ success: false, message: 'Missing image URL(s)' });
      }

      const results = [];
      for (const target of targets) {
        const deleted = await FileUploadUtils.deleteImage(target);
        results.push({ url: target, deleted });
      }

      const allDeleted = results.every(item => item.deleted);
      return res.json({ success: allDeleted, results });
    } catch (error) {
      next(error);
    }
  },

  /**
   * API: /api/files/download
   * Handles local secure download using a temporary JWT token
   */
  async downloadLocalSecure(req, res, next) {
    try {
      const { token } = req.query;
      if (!token) {
        return res.status(401).json({ success: false, message: 'Missing token' });
      }

      const secret = process.env.JWT_SECRET || 'secret';
      let decoded;
      try {
        decoded = jwt.verify(token, secret);
      } catch (err) {
        return res.status(403).json({ success: false, message: 'Invalid or expired download link' });
      }

      const filePath = decoded.filePath;
      if (!filePath) {
        return res.status(400).json({ success: false, message: 'Invalid token payload' });
      }

      // Check if it's an S3 link
      if (filePath.startsWith('s3://')) {
        const signedUrl = await FileUploadUtils.getSignedDownloadUrl(filePath);
        if (signedUrl) {
          return res.redirect(signedUrl); // Redirect customer to AWS S3 signed link
        } else {
          return res.status(500).json({ success: false, message: 'Failed to generate download link' });
        }
      }

      // Local Fallback
      const safePath = path.resolve(__dirname, '../../../uploads', filePath);
      if (!safePath.startsWith(path.resolve(__dirname, '../../../uploads'))) {
        return res.status(403).json({ success: false, message: 'Access denied' });
      }

      res.download(safePath);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = FileController;
