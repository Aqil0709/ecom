const db = require('../../config/db');

// --- User Profile ---
const updateUserProfile = async (req, res) => {
    const { userId } = req.params;
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Name is required.' });
    }

    try {
        const sql = 'UPDATE users SET name = ? WHERE id = ?';
        const [result] = await db.query(sql, [name, userId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }
        
        // Fetch the updated user to return
        const [users] = await db.query('SELECT id, name, email FROM users WHERE id = ?', [userId]);
        res.status(200).json(users[0]);

    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ message: 'Server error while updating profile.' });
    }
};

// --- User Addresses ---
const getUserAddresses = async (req, res) => {
    const { userId } = req.params;
    try {
        const [addresses] = await db.query('SELECT * FROM addresses WHERE user_id = ?', [userId]);
        res.status(200).json(addresses);
    } catch (error) {
        console.error('Get addresses error:', error);
        res.status(500).json({ message: 'Server error while fetching addresses.' });
    }
};

const addUserAddress = async (req, res) => {
    const { userId } = req.params;
    const { name, mobile, pincode, locality, address, city, state, address_type } = req.body;

    // Basic validation
    if (!name || !mobile || !pincode || !address || !city || !state) {
        return res.status(400).json({ message: 'Please fill all required fields.' });
    }

    try {
        const sql = `
            INSERT INTO addresses (user_id, name, mobile, pincode, locality, address, city, state, address_type)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        await db.query(sql, [userId, name, mobile, pincode, locality, address, city, state, address_type]);

        // Fetch all addresses for the user to return the updated list
        const [updatedAddresses] = await db.query('SELECT * FROM addresses WHERE user_id = ?', [userId]);
        res.status(201).json(updatedAddresses);

    } catch (error) {
        console.error('Add address error:', error);
        res.status(500).json({ message: 'Server error while adding address.' });
    }
};

module.exports = {
    updateUserProfile,
    getUserAddresses,
    addUserAddress
};