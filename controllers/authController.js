// controllers/authController.js
const User = require('../models/user');
const sendEmail = require('../utils/sendEmail');
const jwt = require('jsonwebtoken');
// Forgot password handler - Sends reset link via email
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'No user found with that email' });
    }

    // Generate a reset token
    const resetToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Save the reset token and expiration date in the user record
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000;  // Token valid for 1 hour
    await user.save();

    const resetLink = `http://localhost:5000/api/auth/reset-password?token=${resetToken}&email=${user.email}`;
    
    const subject = 'Password Reset Request';
    const text = `Click the link to reset your password: ${resetLink}`;

    // Send the reset email with the link
    await sendEmail(user.email, subject, text);

    res.status(200).json({ message: 'A reset link has been sent to your email.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
};
