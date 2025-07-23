const db = require('../../config/db');

// --- PUBLIC ---
const getAllProducts = async (req, res) => {
    try {
        const [products] = await db.query('SELECT * FROM products ORDER BY created_at DESC');
        // The 'images' column is stored as a JSON string, so we need to parse it.
        const parsedProducts = products.map(p => ({...p, images: JSON.parse(p.images)}));
        res.status(200).json(parsedProducts);
    } catch (error) {
        console.error('Get all products error:', error);
        res.status(500).json({ message: 'Server error while fetching products.' });
    }
};


const addProduct = async (req, res) => {
    const { name, category, price, description } = req.body;
    
    // Check if a file was uploaded
    if (!req.file) {
        return res.status(400).json({ message: 'Product image is required.' });
    }

    // req.file.path now contains the secure URL from Cloudinary
    const imageUrl = req.file.path;
    const imagesJson = JSON.stringify([imageUrl]); // Store it in your database

    try {
        // The SQL query string has been fixed below
        const sql = `
            INSERT INTO products (name, category, price, description, images)
            VALUES (?, ?, ?, ?, ?)
        `;
        
        const [result] = await db.query(sql, [name, category, price, description, imagesJson]);
        
        // Construct the full response body
        const newProduct = {
            id: result.insertId,
            name,
            category,
            price: parseFloat(price),
            description,
            images: [imageUrl]
        };

        res.status(201).json(newProduct);

    } catch (error) {
        console.error('Add product error:', error);
        res.status(500).json({ message: 'Server error while adding product.' });
    }
};

// --- ADMIN ONLY (NEW FUNCTION) ---
const deleteProduct = async (req, res) => {
    // The productId is passed as a URL parameter (e.g., /api/products/delete/1/105)
    const { productId } = req.params;

    if (!productId) {
        return res.status(400).json({ message: 'Product ID is required.' });
    }

    try {
        const sql = 'DELETE FROM products WHERE id = ?';
        const [result] = await db.query(sql, [productId]);

        // The 'affectedRows' property tells us if the query actually deleted something.
        // If it's 0, no product with that ID was found.
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        // Send a success response. A 200 status is fine, or 204 (No Content).
        res.status(200).json({ message: 'Product deleted successfully.' });

    } catch (error) {
        console.error('Delete product error:', error);
        res.status(500).json({ message: 'Server error while deleting product.' });
    }
};


module.exports = {
    getAllProducts,
    addProduct,
    deleteProduct // <-- Don't forget to export the new function
};