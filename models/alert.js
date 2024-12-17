const mongoose = require('mongoose');

const AlertSchema = new mongoose.Schema({
  deviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Device' },
  alertType: { type: String, required: true }, // e.g., motion detected, camera offline
  timestamp: { type: Date, default: Date.now },
  status: { type: String, default: 'unread' }, // unread, read
});

const Alert = mongoose.model('Alert', AlertSchema);

module.exports = Alert;
