const mongoose = require('mongoose');

const SweetSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    maxLength: 100 
  },
  category: { 
    type: String, 
    required: true, 
    maxLength: 50 
  },
  price: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  quantity: { 
    type: Number, 
    required: true, 
    min: 0,
    default: 0
  },
  image: { 
    type: String, 
    required: false, 
    default: 'https://placehold.co/600x400/1f2937/fbbf24?text=Sweet' // A default placeholder image
  }
}, {
 
  timestamps: true 
});

// Ensure unique sweet name per category
SweetSchema.index({ name: 1, category: 1 }, { unique: true });

module.exports = mongoose.model("Sweet", SweetSchema);