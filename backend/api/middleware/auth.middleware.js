const db = require('../../config/db');

const isAdmin = async (req, res, next) => {
    // This is a simplified check. In a real app, you'd use JWTs (JSON Web Tokens)
    // to verify the user's session and role from a token sent in the header.
    const { userId } = req.params; // Assuming userId is part of the route for now

    if (!userId) {
        return res.status(401).json({ message: 'Authentication required.' });
    }

    try {
        const [users] = await db.query('SELECT role FROM users WHERE id = ?', [userId]);
        
        if (users.length === 0 || users[0].role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden: Admin access required.' });
        }

        // If user is an admin, proceed to the next function in the route
        next();
    } catch (error) {
        console.error('Admin check error:', error);
        res.status(500).json({ message: 'Server error during authentication check.' });
    }
};

module.exports = { isAdmin };