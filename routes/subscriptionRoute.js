const express = require('express');
const Subscription = require('./models/Subscription'); // Mongoose model
const webPush = require('./web-push-config');
const router = express.Router();

router.post('/subscribe', async (req, res) => {
  const subscription = req.body;

  try {
    // Save the subscription to the database
    await Subscription.create(subscription);
    res.status(201).json({ message: 'Subscription successful!' });
  } catch (error) {
    console.error('Error saving subscription:', error);
    res.status(500).json({ error: 'Error subscribing to push notifications' });
  }
});

module.exports = router;
