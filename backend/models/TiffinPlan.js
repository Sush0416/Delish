const mongoose = require('mongoose');

const tiffinPlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  type: {
    type: String,
    enum: ['veg', 'non-veg', 'jain', 'diet'],
    required: true
  },
  duration: {
    type: String,
    enum: ['daily', 'weekly', 'monthly'],
    required: true
  },
  mealsPerDay: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  discountedPrice: Number,
  features: [String],
  includedItems: [{
    mealType: {
      type: String,
      enum: ['breakfast', 'lunch', 'dinner']
    },
    items: [String]
  }],
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: Number,
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  images: [String],
  deliveryAreas: [String],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('TiffinPlan', tiffinPlanSchema);