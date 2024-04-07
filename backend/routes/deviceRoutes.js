const express = require('express');
const router = express.Router();
const Device = require('../models/Device');

// Get all devices
router.get('/', async (req, res) => {
  try {
    const devices = await Device.find();
    res.json(devices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single device
router.get('/:id', getDevice, (req, res) => {
  res.json(res.device);
});

// Create a device
router.post('/', async (req, res) => {
  const device = new Device(req.body);
  try {
    const newDevice = await device.save();
    res.status(201).json(newDevice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Handle image upload
router.post('/upload', async (req, res) => {
  try {
    const { data, contentType } = req.body;
    const device = new Device({
      image: {
        data: Buffer.from(data, 'base64'), // Convert base64 string to buffer
        contentType: contentType,
      },
    });
    const savedDevice = await device.save();
    res.status(201).json(savedDevice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a device
router.patch('/:id', getDevice, async (req, res) => {
  if (req.body.serialNumber != null) {
    res.device.serialNumber = req.body.serialNumber;
  }
  if (req.body.type != null) {
    res.device.type = req.body.type;
  }
  if (req.body.image != null) {
    res.device.image = req.body.image;
  }
  if (req.body.status != null) {
    res.device.status = req.body.status;
  }
  try {
    const updatedDevice = await res.device.save();
    res.json(updatedDevice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a device
router.delete('/:id', getDevice, async (req, res) => {
  try {
    await res.device.remove();
    res.json({ message: 'Deleted device' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware function to get device by ID
async function getDevice(req, res, next) {
  let device;
  try {
    device = await Device.findById(req.params.id);
    if (device == null) {
      return res.status(404).json({ message: 'Device not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.device = device;
  next();
}

module.exports = router;
