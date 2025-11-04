const express = require('express');
const router = express.Router();
const rideController = require('../controllers/rideController');

// Create a new ride
router.post('/', rideController.createRide);

// Get all rides for a user
router.get('/user/:userId', rideController.getUserRides);

// Update ride status
router.put('/:id', rideController.updateRideStatus);

module.exports = router;