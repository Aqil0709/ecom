const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');


// Import route handlers
const authRoutes = require('./api/auth/auth.routes');
const cartRoutes = require('./api/cart/cart.routes');
const profileRoutes = require('./api/profile/profile.routes');
const productRoutes = require('./api/products/products.routes'); // <-- ADD THIS

const app = express();
const PORT = 5001;

// --- MIDDLEWARE ---
app.use(cors()); 
app.use(express.json());

// --- API ROUTES ---
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/products', productRoutes); // <-- ADD THIS
app.use('/public', express.static(path.join(__dirname, 'public')));
// --- SERVER START ---
app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});