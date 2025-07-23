const express = require('express');
const router = express.Router();
const { getAllProducts, addProduct, deleteProduct } = require('./products.controller');
const { isAdmin } = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');

// PUBLIC ROUTE
// GET /api/products - Get all products for the store
router.get('/', getAllProducts);

// ADMIN-ONLY ROUTE (This is the one that was duplicated)
// POST /api/products/add/:userId - Add a new product
router.post('/add/:userId', isAdmin, upload, addProduct); // Keep ONLY this version

// ADMIN-ONLY ROUTE
// DELETE /api/products/delete/:userId/:productId - Delete a product
router.delete('/delete/:userId/:productId', isAdmin, deleteProduct);

module.exports = router;