const crypto = require('crypto');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const fs = require('fs');

if (process.env.CLOUDINARY_CLOUD_NAME) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
}

const s3Client = process.env.AWS_REGION ? new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
}) : null;

const UPLOADS_DIR = path.join(__dirname, '../../../uploads');

function ensureUploadsDir() {
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
}

const FileUploadUtils = {
  async saveBase64Image(base64String) {
    if (typeof base64String === 'object' && base64String !== null) {
      base64String = base64String.image_url || base64String.url || '';
    }
    if (typeof base64String !== 'string' || !base64String.startsWith('data:image')) {
      return base64String;
    }
    
    if (process.env.CLOUDINARY_CLOUD_NAME) {
      const res = await cloudinary.uploader.upload(base64String, { folder: 'shopflow_crm_products' });
      return res.secure_url;
    }

    ensureUploadsDir();
    const matches = base64String.match(/^data:image\/([a-zA-Z0-9]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) return base64String;

    const extension = matches[1] === 'jpeg' ? 'jpg' : matches[1];
    const data = matches[2];
    const filename = `${crypto.randomUUID()}.${extension}`;
    fs.writeFileSync(path.join(UPLOADS_DIR, filename), Buffer.from(data, 'base64'));
    return `${process.env.BACKEND_URL || 'http://localhost:3000'}/uploads/${filename}`;
  },

  async saveFileBuffer(fileBuffer, originalName, mimetype = 'image/png') {
    if (!fileBuffer || !Buffer.isBuffer(fileBuffer)) return null;

    const isImage = mimetype.startsWith('image/');
    const extension = path.extname(originalName || '') || (mimetype.split('/')[1] || 'bin');
    const cleanExt = extension.startsWith('.') ? extension.slice(1) : extension;
    const filename = `${crypto.randomUUID()}.${cleanExt}`;

    try {
      // 1. Upload Images to Cloudinary
      if (isImage && process.env.CLOUDINARY_CLOUD_NAME) {
        const dataUri = `data:${mimetype};base64,${fileBuffer.toString('base64')}`;
        const res = await cloudinary.uploader.upload(dataUri, { folder: 'shopflow_crm_products' });
        return res.secure_url;
      }

      // 2. Upload Non-Images (Ebooks, docs) to AWS S3
      if (!isImage && s3Client) {
        const bucket = process.env.AWS_S3_BUCKET_NAME || 'crm-digital-products';
        const key = `private/${filename}`;
        await s3Client.send(new PutObjectCommand({
          Bucket: bucket,
          Key: key,
          Body: fileBuffer,
          ContentType: mimetype
        }));
        return `s3://${bucket}/${key}`; // Private scheme indicating S3
      }

      // 3. Fallback Local Storage
      ensureUploadsDir();
      fs.writeFileSync(path.join(UPLOADS_DIR, filename), fileBuffer);
      return `${process.env.BACKEND_URL || 'http://localhost:3000'}/uploads/${filename}`;
    } catch (error) {
      console.error('Error saving file buffer:', error);
      return null;
    }
  },

  async deleteImage(imageUrl) {
    if (!imageUrl || typeof imageUrl !== 'string') return false;

    try {
      if (imageUrl.includes('res.cloudinary.com')) {
        const match = imageUrl.match(/\/v\d+\/(.+)\.[a-zA-Z]{3,4}(\?.*)?$/);
        if (match && match[1]) {
          await cloudinary.uploader.destroy(match[1], { resource_type: 'image' });
          return true;
        }
      }

      if (imageUrl.startsWith('s3://') && s3Client) {
        const bucket = imageUrl.split('/')[2];
        const key = imageUrl.split('/').slice(3).join('/');
        await s3Client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
        return true;
      }

      const urlPath = imageUrl.replace(`${process.env.BACKEND_URL || 'http://localhost:3000'}/uploads/`, '');
      const filepath = path.join(UPLOADS_DIR, urlPath);
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
        return true;
      }
    } catch (err) {
      console.error('Error deleting file:', err);
    }
    return false;
  },

  async getSignedDownloadUrl(filePath) {
    if (filePath.startsWith('s3://') && s3Client) {
      const bucket = filePath.split('/')[2];
      const key = filePath.split('/').slice(3).join('/');
      const command = new GetObjectCommand({ Bucket: bucket, Key: key });
      // 15 mins expiry
      return await getSignedUrl(s3Client, command, { expiresIn: 900 });
    }
    return null; // Return null if not S3, handled gracefully by controller
  }
};

module.exports = FileUploadUtils;