const express = require('express');
const Alert = require('../models/alert');
const router = express.Router();

// Get all alerts
router.get('/alerts', async (req, res) => {
  try {
    const alerts = await Alert.find({ userId: req.userId });
    res.status(200).json(alerts);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching alerts', details: err.message });
  }
});

module.exports = router;
