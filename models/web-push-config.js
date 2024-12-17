const webPush = require('web-push');
require('dotenv').config();

// Use VAPID keys from the .env file
const vapidKeys = {
  publicKey: process.env.VAPID_PUBLIC_KEY,
  privateKey: process.env.VAPID_PRIVATE_KEY,
};

webPush.setVapidDetails(
  'mailto:example@yourdomain.com', // Email address (this can be any email)
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

module.exports = webPush;
