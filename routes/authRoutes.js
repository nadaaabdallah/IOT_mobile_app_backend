const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

// Register new user (Sign Up)
router.post('/signup', async (req, res) => {
  const { email, password ,name} = req.body;

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

module.exports = router;
