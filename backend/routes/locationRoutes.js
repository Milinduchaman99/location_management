const express = require('express');
const router = express.Router();
const Location = require('../models/Location');

// Get all locations
router.get('/', async (req, res) => {
  try {
    const locations = await Location.find().populate('devices');
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new location
router.post('/', async (req, res) => {
  const location = new Location(req.body);
  try {
    const newLocation = await location.save();
    res.status(201).json(newLocation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Other CRUD operations...

module.exports = router;
