const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant'
  },
  tiffinPlan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TiffinPlan'
  },
  orderType: {
    type: String,
    enum: ['restaurant', 'tiffin'],
    required: true
  },
  items: [{
    name: String,
    price: Number,
    quantity: {
      type: Number,
      default: 1
    },
    instructions: String,
    itemTotal: Number
  }],
  subtotal: {
    type: Number,
    required: true
  },
  deliveryFee: {
    type: Number,
    default: 0
  },
  tax: {
    type: Number,
    default: 0
  },
  discount: {
    type: Number,
    default: 0
  },
  totalAmount: {
    type: Number,
    required: true
  },
  deliveryAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    required: true
  },
  status: {
    type: String,
    enum: [
      'pending',
      'confirmed',
      'preparing',
      'ready_for_delivery',
      'out_for_delivery',
      'delivered',
      'cancelled',
      'refunded'
    ],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'cash', 'upi', 'netbanking'],
    required: true
  },
  paymentDetails: {
    transactionId: String,
    paymentGateway: String,
    paidAt: Date
  },
  deliveryInstructions: String,
  expectedDelivery: Date,
  deliveredAt: Date,
  rider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  review: String,
  preparationTime: Number, // in minutes
  tracking: [{
    status: String,
    description: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Generate order number before saving
orderSchema.pre('save', async function(next) {
  if (this.isNew) {
    const date = new Date();
    const timestamp = date.getTime();
    const random = Math.floor(Math.random() * 1000);
    this.orderNumber = `ORD-${timestamp}-${random}`;
  }
  next();
});

// Indexes for better performance
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ restaurant: 1, createdAt: -1 });
orderSchema.index({ status: 1 });
orderSchema.index({ orderNumber: 1 });

module.exports = mongoose.model('Order', orderSchema);