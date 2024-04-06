const express = require('express');
const router = express.Router();
const Device = require('../models/Device');

// Define your routes here
// Example:
router.get('/', (req, res) => {
  res.send('Device routes');
});

module.exports = router;
