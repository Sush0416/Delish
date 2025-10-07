const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors, validateObjectId } = require('../middleware/validation');
const { auth } = require('../middleware/auth');
const {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
  cancelOrder,
  trackOrder
} = require('../controllers/orderController');

// @route   GET /api/orders
// @desc    Get user orders
// @access  Private
router.get('/', auth, getOrders);

// @route   GET /api/orders/:id
// @desc    Get order by ID
// @access  Private
router.get('/:id', validateObjectId, auth, getOrder);

// @route   GET /api/orders/:id/track
// @desc    Track order
// @access  Private
router.get('/:id/track', validateObjectId, auth, trackOrder);

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.post('/', [
  auth,
  check('orderType', 'Order type is required').isIn(['restaurant', 'tiffin']),
  check('items', 'Items are required').isArray({ min: 1 }),
  check('deliveryAddress', 'Delivery address is required').not().isEmpty(),
  check('paymentMethod', 'Payment method is required').isIn(['card', 'cash', 'upi', 'netbanking'])
], handleValidationErrors, createOrder);

// @route   PUT /api/orders/:id/status
// @desc    Update order status
// @access  Private
router.put('/:id/status', [
  validateObjectId,
  auth,
  check('status', 'Valid status is required').isIn([
    'pending', 'confirmed', 'preparing', 'ready_for_delivery', 
    'out_for_delivery', 'delivered', 'cancelled'
  ])
], handleValidationErrors, updateOrderStatus);

// @route   PUT /api/orders/:id/cancel
// @desc    Cancel order
// @access  Private
router.put('/:id/cancel', validateObjectId, auth, cancelOrder);

module.exports = router;