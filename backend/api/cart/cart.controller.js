const db = require('../../config/db');

const getCart = async (req, res) => {
    const { userId } = req.params;
    try {
        const [cartItems] = await db.query('SELECT * FROM cart_items WHERE user_id = ?', [userId]);
        res.status(200).json(cartItems);
    } catch (error) {
        console.error('Get cart error:', error);
        res.status(500).json({ message: 'Server error while fetching cart.' });
    }
};

const addToCart = async (req, res) => {
    const { userId } = req.params;
    const { id: productId, name, price } = req.body; // Product details from frontend

    try {
        // Using INSERT ... ON DUPLICATE KEY UPDATE to handle both adding and incrementing
        const sql = `
            INSERT INTO cart_items (user_id, product_id, name, price, quantity) 
            VALUES (?, ?, ?, ?, 1)
            ON DUPLICATE KEY UPDATE quantity = quantity + 1
        `;
        await db.query(sql, [userId, productId, name, price]);

        // Fetch the updated cart to send back
        const [updatedCart] = await db.query('SELECT * FROM cart_items WHERE user_id = ?', [userId]);
        res.status(200).json(updatedCart);

    } catch (error) {
        console.error('Add to cart error:', error);
        res.status(500).json({ message: 'Server error while adding to cart.' });
    }
};

const updateCartItem = async (req, res) => {
    const { userId, productId } = req.params;
    const { quantity } = req.body;

    if (quantity <= 0) {
        // If quantity is 0 or less, remove the item instead
        return removeCartItem(req, res);
    }

    try {
        const sql = 'UPDATE cart_items SET quantity = ? WHERE user_id = ? AND product_id = ?';
        await db.query(sql, [quantity, userId, productId]);

        const [updatedCart] = await db.query('SELECT * FROM cart_items WHERE user_id = ?', [userId]);
        res.status(200).json(updatedCart);

    } catch (error) {
        console.error('Update cart item error:', error);
        res.status(500).json({ message: 'Server error while updating cart item.' });
    }
};

const removeCartItem = async (req, res) => {
    const { userId, productId } = req.params;

    try {
        const sql = 'DELETE FROM cart_items WHERE user_id = ? AND product_id = ?';
        await db.query(sql, [userId, productId]);

        const [updatedCart] = await db.query('SELECT * FROM cart_items WHERE user_id = ?', [userId]);
        res.status(200).json(updatedCart);

    } catch (error) {
        console.error('Remove cart item error:', error);
        res.status(500).json({ message: 'Server error while removing cart item.' });
    }
};

module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    removeCartItem
};
