const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  cuisine: {
    type: String,
    required: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: {
      type: String,
      default: 'India'
    }
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      default: [0, 0]
    }
  },
  phone: {
    type: String,
    required: true
  },
  email: String,
  images: [{
    url: String,
    alt: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  openingHours: {
    Monday: { open: String, close: String, isOpen: Boolean },
    Tuesday: { open: String, close: String, isOpen: Boolean },
    Wednesday: { open: String, close: String, isOpen: Boolean },
    Thursday: { open: String, close: String, isOpen: Boolean },
    Friday: { open: String, close: String, isOpen: Boolean },
    Saturday: { open: String, close: String, isOpen: Boolean },
    Sunday: { open: String, close: String, isOpen: Boolean }
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalRatings: {
    type: Number,
    default: 0
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: String,
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  deliveryInfo: {
    minOrder: {
      type: Number,
      default: 0
    },
    deliveryTime: {
      type: Number, // in minutes
      default: 30
    },
    deliveryFee: {
      type: Number,
      default: 0
    },
    deliveryAreas: [String]
  },
  menu: [{
    category: {
      type: String,
      required: true
    },
    items: [{
      name: {
        type: String,
        required: true
      },
      description: String,
      price: {
        type: Number,
        required: true
      },
      discountedPrice: Number,
      image: String,
      isVegetarian: {
        type: Boolean,
        default: true
      },
      isAvailable: {
        type: Boolean,
        default: true
      },
      spiceLevel: {
        type: String,
        enum: ['mild', 'medium', 'spicy'],
        default: 'medium'
      },
      ingredients: [String],
      allergens: [String],
      preparationTime: Number // in minutes
    }]
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  tags: [String]
}, {
  timestamps: true
});

// Index for geospatial queries
restaurantSchema.index({ location: '2dsphere' });
restaurantSchema.index({ cuisine: 1 });
restaurantSchema.index({ rating: -1 });
restaurantSchema.index({ isActive: 1, isFeatured: 1 });

module.exports = mongoose.model('Restaurant', restaurantSchema);