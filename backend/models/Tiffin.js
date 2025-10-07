const mongoose = require('mongoose');

const TiffinSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['veg', 'non-veg', 'jain', 'diet', 'weekly', 'monthly'], // allow all frontend filter types
    default: 'veg' 
  },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  restaurant: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Tiffin', TiffinSchema);
