const express = require('express');
const router = express.Router();
const { 
    updateUserProfile, 
    getUserAddresses, 
    addUserAddress 
} = require('./profile.controller');

// PUT /api/profile/:userId - Update user's personal details (e.g., name)
router.put('/:userId', updateUserProfile);

// GET /api/profile/:userId/addresses - Get all addresses for a user
router.get('/:userId/addresses', getUserAddresses);

// POST /api/profile/:userId/addresses - Add a new address for a user
router.post('/:userId/addresses', addUserAddress);

module.exports = router;
