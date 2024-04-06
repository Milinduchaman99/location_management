const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    serialNumber: { type: String, required: true, unique: true },
    type: { type: String, enum: ['pos', 'kiosk', 'signage'], required: true },
    image: { type: String }, // Assuming image is stored as URL
    status: { type: String, enum: ['active', 'inactive'], required: true },
  });

  module.exports = mongoose.model('Device', deviceSchema);