const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const User = require('../models/userModel');

exports.register = async (req, res) => {
  try {
    const {
      email,
      username,
      password,
      confirmPassword,
      firstName,
      lastName,
      mobileNumber,
      dateOfBirth,
      gender,
      city,
      state,
      country,
      idProofType,
      idProofNumber,
      educationDetails,
      resume,
      profilePicture,
      preferences
    } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      where: {
        email: email,
      }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Check if username already exists
    if (username) {
      const existingUsername = await User.findOne({
        where: {
          username: username,
        }
      });

      if (existingUsername) {
        return res.status(400).json({ error: 'Username already taken' });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      username,
      password: hashedPassword,
      firstName,
      lastName,
      mobileNumber,
      dateOfBirth,
      gender,
      city,
      state,
      country,
      idProofType,
      idProofNumber,
      educationDetails,
      resume,
      profilePicture,
      preferences: preferences ? JSON.parse(preferences) : null
    });

    res.status(201).json({ 
      message: 'User registered successfully',
      userId: user.id 
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;

    if (!emailOrUsername || !password) {
      return res.status(400).json({ error: 'Email/Username and password are required' });
    }

    // Allow login with either email or username
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { email: emailOrUsername },
          { username: emailOrUsername }
        ]
      }
    });

    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.json({ 
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      firstName,
      lastName,
      username,
      mobileNumber,
      dateOfBirth,
      gender,
      city,
      state,
      country,
      idProofType,
      idProofNumber,
      educationDetails,
      resume,
      profilePicture,
      preferences
    } = req.body;

    // Check if new username already exists (if changing)
    if (username) {
      const existingUsername = await User.findOne({
        where: {
          username: username,
          id: { [Op.ne]: userId }
        }
      });

      if (existingUsername) {
        return res.status(400).json({ error: 'Username already taken' });
      }
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user fields
    await user.update({
      firstName,
      lastName,
      username,
      mobileNumber,
      dateOfBirth,
      gender,
      city,
      state,
      country,
      idProofType,
      idProofNumber,
      educationDetails,
      resume,
      profilePicture,
      preferences: preferences ? JSON.parse(preferences) : null
    });

    res.json({ 
      message: 'Profile updated successfully',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: error.message });
  }
};