const express = require('express');
const sweetController = require('../controllers/sweet.controller');
const { protect, admin } = require('../middlewares/auth.middleware');

const router = express.Router();

// 1. Standard Routes
router.get('/', sweetController.getSweets);

//Search Route (Must be BEFORE /:id)

router.get('/search', sweetController.searchSweets);

router.get('/:id', sweetController.getSweetById);

// 3. User Actions
router.post('/:id/purchase', protect, sweetController.purchaseSweet);

// 4. Admin Actions
router.post('/', protect, admin, sweetController.createSweet);
router.put('/:id', protect, admin, sweetController.updateSweet);
router.delete('/:id', protect, admin, sweetController.deleteSweet);

//  Restock Route (Admin Only)
router.post('/:id/restock', protect, admin, sweetController.restockSweet);

module.exports = router;