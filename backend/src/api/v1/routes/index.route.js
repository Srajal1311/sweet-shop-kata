const express = require('express');
const authRoutes = require('./auth.route');
const sweetRoutes = require('./sweet.route');

const router = express.Router();

// 👇 This connects /api/v1/auth --> authRoutes
router.use('/auth', authRoutes);

// 👇 This connects /api/v1/sweets --> sweetRoutes
router.use('/sweets', sweetRoutes);

module.exports = router;