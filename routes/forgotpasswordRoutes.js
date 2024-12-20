const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const User = require('../models/user');  
const router = express.Router();

router.post('/forgotpassword', async (req, res) => {
  const { email } = req.body;
  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email not found' });
    }
    // Generate a reset code
    const resetCode = crypto.randomBytes(20).toString('hex');
    const resetCodeExpiration = Date.now() + 3600000; // Expires in 1 hour

    // Save reset code and expiration time to the user model
    user.resetPasswordCode = resetCode;
    user.resetPasswordCodeExpiration = resetCodeExpiration;
    await user.save();

    // Send the reset code to the user's email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset Code',
      text: `Your password reset code is: ${resetCode}`,
    });

    res.status(200).json({ message: 'A reset code has been sent to your email' });
  } catch (error) {
    // Log detailed error information
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code,
    });

    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
