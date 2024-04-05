const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String },
  devices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Device' }],
});

module.exports = mongoose.model('Location', locationSchema);
