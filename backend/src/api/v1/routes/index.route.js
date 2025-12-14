const express = require('express');
const authRoutes = require('./auth.route');
const sweetRoutes = require('./sweet.route');

const router = express.Router();


router.use('/auth', authRoutes);


router.use('/sweets', sweetRoutes);

module.exports = router;