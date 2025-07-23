const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with credentials from your .env file
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Set up Cloudinary storage engine for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'shopkart_products', // The name of the folder in Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg', 'gif'], // Allowed image formats
    // You can apply transformations here if needed
    // transformation: [{ width: 500, height: 500, crop: 'limit' }]
  },
});

// Initialize Multer with the Cloudinary storage engine
const upload = multer({ storage: storage }).single('productImage');

module.exports = upload;