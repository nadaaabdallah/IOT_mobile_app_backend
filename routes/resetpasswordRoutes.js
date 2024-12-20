const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Reset Password Route
router.post('/', async (req, res) => {
  const { email, code, newPassword } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email not found' });
    }

    // Check if the reset code is valid and not expired
    if (
      user.resetPasswordCode !== code ||
      Date.now() > user.resetPasswordCodeExpiration
    ) {
      return res.status(400).json({ message: 'Invalid or expired reset code' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the password and clear reset code
    user.password = hashedPassword;
    user.resetPasswordCode = undefined;  // Clear the reset code
    user.resetPasswordCodeExpiration = undefined; // Clear the expiration time
    await user.save();

    res.status(200).json({ message: 'Password successfully reset' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
