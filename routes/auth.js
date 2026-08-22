const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

// REGISTER USER
router.post('/register', async function(req, res) {
  try {
    const { username, password } = req.body;

    // Username and password are required
    if (!username || !password) {
      return res.status(400).json({
        message: 'Username and password are required.'
      });
    }

    // Username must be 3-20 characters using letters, numbers, or underscores
    const usernamePattern = /^[A-Za-z0-9_]{3,20}$/;

    if (!usernamePattern.test(username)) {
      return res.status(400).json({
        message:
          'Username must be 3-20 characters and contain only letters, numbers, or underscores.'
      });
    }

    // Password must be at least 8 characters and contain a number
    if (password.length < 8 || !/\d/.test(password)) {
      return res.status(400).json({
        message:
          'Password must be at least 8 characters long and contain a number.'
      });
    }

    // Prevent duplicate usernames
    const existingUser = await User.findOne({
      username: username
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'Username already exists.'
      });
    }

    // Hash password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username: username,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({
      message: 'User registered successfully.'
    });

  } catch (error) {
    res.status(500).json({
      message: 'Server error during registration.'
    });
  }
});

// LOGIN USER
router.post('/login', async function(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: 'Username and password are required.'
      });
    }

    const user = await User.findOne({
      username: username
    });

    if (!user) {
      return res.status(401).json({
        message: 'Invalid username or password.'
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: 'Invalid username or password.'
      });
    }

    res.json({
      message: 'Login successful.',
      username: user.username,
      userId: user._id
    });

  } catch (error) {
    res.status(500).json({
      message: 'Server error during login.'
    });
  }
});

// GET USER BY USERNAME
router.get('/user/:username', async function(req, res) {
  try {
    const user = await User.findOne({
      username: req.params.username
    }).select('_id username');

    if (!user) {
      return res.status(404).json({
        message: 'User not found.'
      });
    }

    res.json(user);

  } catch (error) {
    res.status(500).json({
      message: 'Server error while loading user.'
    });
  }
});

module.exports = router;
