const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

// Register new user (Sign Up)
router.post('/signup', async (req, res) => {
  const { email, password, name } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({ email, password, name });
    await newUser.save();

    // Generate a token for the new user
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Set expiration time for the token
    });

    res.status(201).send({ message: 'User registered successfully', token });
  } catch (error) {
    res.status(400).send({ error: 'Error creating user', details: error.message });
  }
});


/*  try {
    const user = new User({ email, password,name });
    await user.save();
    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).send({ error: 'Error creating user', details: error.message });
  }*/
//});

// Login user (Sign In)
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ error: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).send({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Set expiration time for the token
    });

    res.status(200).send({ message: 'Login successful', token });
  } catch (error) {
    res.status(400).send({ error: 'Error logging in', details: error.message });
  }
});
// Forgot Password Route
router.post('/forgotpassword', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const resetCode = crypto.randomInt(100000, 999999).toString(); // Generate a 6-digit code
    const expiration = Date.now() + 3600000; // Code valid for 1 hour

    user.resetPasswordCode = resetCode;
    user.resetPasswordCodeExpiration = expiration;
    await user.save();

    // Send the reset code via email (dummy implementation here)
    console.log(`Reset code for ${email}: ${resetCode}`);

    res.status(200).json({ message: 'A reset code has been sent to your email' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Reset Password Route
router.post('/resetpassword', async (req, res) => {
  const { email, resetPasswordCode, newPassword } = req.body;

  try {
    const user = await User.findOne({
      email,
      resetPasswordCode,
      resetPasswordCodeExpiration: { $gt: Date.now() }, // Check if code is not expired
    });

    if (!user) return res.status(400).json({ message: 'Invalid or expired reset code' });

    user.password = newPassword; // Hash the password before saving in production
    user.resetPasswordCode = null; // Clear reset code
    user.resetPasswordCodeExpiration = null; // Clear expiration
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router;
