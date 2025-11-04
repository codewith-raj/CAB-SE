const Ride = require('../models/Ride');

// Create a new ride request
exports.createRide = async (req, res) => {
  try {
    const { userId, pickup, destination, rideType } = req.body;
    
    const ride = new Ride({
      user: userId,
      pickup,
      destination,
      rideType,
      fare: calculateFare(pickup, destination, rideType)
    });
    
    await ride.save();
    
    res.status(201).json({
      success: true,
      ride
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all rides for a user
exports.getUserRides = async (req, res) => {
  try {
    const rides = await Ride.find({ user: req.params.userId });
    
    res.status(200).json({
      success: true,
      count: rides.length,
      rides
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update ride status
exports.updateRideStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const ride = await Ride.findById(req.params.id);
    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }
    
    ride.status = status;
    await ride.save();
    
    res.status(200).json({
      success: true,
      ride
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Helper function to calculate fare
const calculateFare = (pickup, destination, rideType) => {
  // Simple fare calculation (in a real app, this would be more complex)
  const baseFare = {
    'Khushi Go': 50,
    'Khushi Premier': 80,
    'Khushi XL': 100,
    'Khushi Luxury': 150
  };
  
  // Dummy distance calculation
  const distance = 5; // In kilometers
  
  return baseFare[rideType] + (distance * 10);
};