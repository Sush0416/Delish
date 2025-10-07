const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  label: {
    type: String,
    required: true,
    trim: true,
    enum: ['home', 'work', 'other']
  },
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  street: {
    type: String,
    required: true
  },
  landmark: String,
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zipCode: {
    type: String,
    required: true
  },
  country: {
    type: String,
    default: 'India'
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
  isDefault: {
    type: Boolean,
    default: false
  },
  instructions: String
}, {
  timestamps: true
});

// Index for geospatial queries
addressSchema.index({ location: '2dsphere' });
addressSchema.index({ user: 1, isDefault: 1 });

module.exports = mongoose.model('Address', addressSchema);