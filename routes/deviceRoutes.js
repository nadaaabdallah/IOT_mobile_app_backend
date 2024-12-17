const express = require('express');
const Device = require('../models/device');
const router = express.Router();

// Add a new device
router.post('/device', async (req, res) => {
  const { name, ipAddress, userId } = req.body;
  try {
    const newDevice = new Device({ name, ipAddress, userId });
    await newDevice.save();
    res.status(201).json({ message: 'Device added successfully', device: newDevice });
  } catch (err) {
    res.status(500).json({ error: 'Error adding device', details: err.message });
  }
});

// Get all devices for a user
router.get('/devices', async (req, res) => {
  try {
    const devices = await Device.find({ userId: req.userId });
    res.status(200).json(devices);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching devices', details: err.message });
  }
});

module.exports = router;
