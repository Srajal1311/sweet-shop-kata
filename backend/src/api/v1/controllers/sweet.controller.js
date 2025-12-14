const Sweet = require('../../../models/Sweet');

// 1. Create a Sweet
exports.createSweet = async (req, res, next) => {
  try {
    const sweet = new Sweet(req.body);
    const savedSweet = await sweet.save();
    res.status(201).json(savedSweet);
  } catch (error) {
    next(error);
  }
};

// 2. Get All Sweets
exports.getSweets = async (req, res, next) => {
  try {
    const sweets = await Sweet.find();
    res.status(200).json(sweets);
  } catch (error) {
    next(error);
  }
};

// 3. Delete a Sweet
exports.deleteSweet = async (req, res, next) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }
    await sweet.deleteOne();
    res.status(200).json({ success: true, message: 'Sweet deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// 4. Get ONE Sweet (For Editing)
exports.getSweetById = async (req, res, next) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return res.status(404).json({ message: 'Sweet not found' });
    res.status(200).json(sweet);
  } catch (error) {
    next(error);
  }
};

// 5. Update a Sweet
exports.updateSweet = async (req, res, next) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return res.status(404).json({ message: 'Sweet not found' });

    Object.assign(sweet, req.body);
    const updatedSweet = await sweet.save();
    res.status(200).json(updatedSweet);
  } catch (error) {
    next(error);
  }
};
// ... updateSweet ...

//  Purchase a sweet (Decrease stock by 1)
exports.purchaseSweet = async (req, res, next) => {
  try {
    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    if (sweet.quantity < 1) {
      return res.status(400).json({ message: 'Out of stock!' });
    }

    // Decrease quantity
    sweet.quantity -= 1;
    await sweet.save();

    res.status(200).json({ 
      success: true, 
      message: `Purchased 1 ${sweet.name}!`, 
      newQuantity: sweet.quantity 
    });
  } catch (error) {
    next(error);
  }
};
// ... existing purchaseSweet function ...

//  Search Sweets (Backend Filter)
exports.searchSweets = async (req, res, next) => {
  try {
    const { q } = req.query; // Get search term from URL ?q=something
    
    if (!q) {
      return res.status(400).json({ message: 'Search query required' });
    }

    // Search Name OR Category (Case insensitive)
    const sweets = await Sweet.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } }
      ]
    });

    res.status(200).json(sweets);
  } catch (error) {
    next(error);
  }
};

// Restock Sweet (Admin Only)
exports.restockSweet = async (req, res, next) => {
  try {
    const { quantity } = req.body; // Expect JSON: { "quantity": 10 }
    
    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: 'Valid quantity required' });
    }

    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return res.status(404).json({ message: 'Sweet not found' });

    sweet.quantity += Number(quantity);
    await sweet.save();

    res.status(200).json({ 
      success: true, 
      message: `Restocked ${quantity} ${sweet.name}!`, 
      newQuantity: sweet.quantity 
    });
  } catch (error) {
    next(error);
  }
};
//finished