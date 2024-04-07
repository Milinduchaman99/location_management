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

// Get a single location
router.get('/:id', getLocation, (req, res) => {
  res.json(res.location);
});

// Create a location
router.post('/', async (req, res) => {
  const location = new Location(req.body);
  try {
    const newLocation = await location.save();
    res.status(201).json(newLocation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a location
router.patch('/:id', getLocation, async (req, res) => {
  if (req.body.name != null) {
    res.location.name = req.body.name;
  }
  if (req.body.address != null) {
    res.location.address = req.body.address;
  }
  if (req.body.phone != null) {
    res.location.phone = req.body.phone;
  }
  try {
    const updatedLocation = await res.location.save();
    res.json(updatedLocation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a location
router.delete('/:_id', getLocation, async (req, res) => {
  try {
    await res.location.remove();
    res.json({ message: 'Deleted location' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware function to get location by ID
async function getLocation(req, res, next) {
  let location;
  try {
    location = await Location.findById(req.params.id);
    if (location == null) {
      return res.status(404).json({ message: 'Location not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.location = location;
  next();
}

module.exports = router;

