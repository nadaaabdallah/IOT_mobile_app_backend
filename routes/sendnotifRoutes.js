const express = require('express');
const Subscription = require('./models/Subscription');
const webPush = require('./web-push-config');
const router = express.Router();

router.post('/send-notification', async (req, res) => {
  const { title, message } = req.body;

  try {
    // Fetch all subscriptions from the database
    const subscriptions = await Subscription.find();

    // Loop through all subscriptions and send the push notification
    const notificationPayload = {
      notification: {
        title: title,
        body: message,
        icon: 'https://your-icon-url.com/icon.png', // Optional: Add an icon
      },
    };

    const pushPromises = subscriptions.map((subscription) =>
      webPush.sendNotification(subscription, JSON.stringify(notificationPayload))
    );

    // Wait for all notifications to be sent
    await Promise.all(pushPromises);

    res.status(200).json({ message: 'Notification sent successfully' });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ error: 'Error sending push notification' });
  }
});

module.exports = router;
