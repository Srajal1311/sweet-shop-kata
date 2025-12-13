const jwt = require('jsonwebtoken');
const User = require('../../../models/User'); // 👈 Import the User model

// 1. Protect Middleware (Login Check)
exports.protect = async (req, res, next) => { // 👈 Mark as async
  let token;

  // Check for token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // If no token, reject
  if (!token) {
    return res.status(401).json({ message: 'Not authorized to access this route' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key_change_me');

    // 👇 CRITICAL CHANGE: Fetch the user from the DB and attach to req
    // We select '-password' so we don't pass the password hash around
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
    }

    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

// 2. Admin Middleware (Role Check)
exports.admin = (req, res, next) => {
  // Now req.user has the full database object, including 'role'
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: Admins only' });
  }
};