const mongoose = require('mongoose');

const tiffinSubscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TiffinPlan',
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'paused', 'cancelled', 'completed'],
    default: 'active'
  },
  deliveryAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    required: true
  },
  preferences: {
    spiceLevel: {
      type: String,
      enum: ['mild', 'medium', 'spicy'],
      default: 'medium'
    },
    allergies: [String],
    specialInstructions: String
  },
  nextDeliveryDate: Date,
  pauseDates: [Date],
  totalAmount: Number,
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('TiffinSubscription', tiffinSubscriptionSchema);