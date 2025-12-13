const User = require('../../../models/User');
const jwt = require('jsonwebtoken');

// Helper to generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret_key_change_me', {
    expiresIn: '1d',
  });
};

exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // 👇 UPDATED LOGIC: 
    // Allow 'admin' OR 'testadmin' to have the Admin role.
    const role = (username.toLowerCase() === 'admin' || username === 'testadmin') ? 'admin' : 'user';

    // Create user with the specific role
    const user = await User.create({ username, password, role });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: { id: user._id, username: user.username, role: user.role }
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // 1. Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 2. Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 3. Generate Token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: { id: user._id, username: user.username, role: user.role }
    });
  } catch (error) {
    next(error);
  }
};