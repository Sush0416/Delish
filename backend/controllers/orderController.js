const Order = require('../models/Order');
const Restaurant = require('../models/Restaurant');
const TiffinPlan = require('../models/TiffinPlan');

// Create new order
exports.createOrder = async (req, res) => {
  try {
    const {
      orderType,
      items,
      deliveryAddress,
      paymentMethod,
      deliveryInstructions,
      restaurantId,
      tiffinPlanId
    } = req.body;

    let orderData = {
      user: req.user._id,
      orderType,
      items,
      deliveryAddress,
      paymentMethod,
      deliveryInstructions
    };

    // Calculate totals
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let deliveryFee = 0;
    let tax = 0;

    if (orderType === 'restaurant') {
      const restaurant = await Restaurant.findById(restaurantId);
      if (!restaurant) {
        return res.status(404).json({
          success: false,
          message: 'Restaurant not found'
        });
      }

      orderData.restaurant = restaurantId;
      deliveryFee = restaurant.deliveryInfo.deliveryFee || 0;
      
      // Check minimum order
      if (subtotal < restaurant.deliveryInfo.minOrder) {
        return res.status(400).json({
          success: false,
          message: `Minimum order amount is ₹${restaurant.deliveryInfo.minOrder}`
        });
      }
    } else if (orderType === 'tiffin') {
      const tiffinPlan = await TiffinPlan.findById(tiffinPlanId);
      if (!tiffinPlan) {
        return res.status(404).json({
          success: false,
          message: 'Tiffin plan not found'
        });
      }

      orderData.tiffinPlan = tiffinPlanId;
    }

    // Calculate tax (example: 5% GST)
    tax = subtotal * 0.05;
    const totalAmount = subtotal + deliveryFee + tax;

    orderData.subtotal = subtotal;
    orderData.deliveryFee = deliveryFee;
    orderData.tax = tax;
    orderData.totalAmount = totalAmount;

    // Add initial tracking
    orderData.tracking = [{
      status: 'pending',
      description: 'Order placed successfully',
      timestamp: new Date()
    }];

    const order = new Order(orderData);
    await order.save();

    // Populate the order for response
    await order.populate('restaurant', 'name images');
    await order.populate('tiffinPlan', 'name images');
    await order.populate('deliveryAddress');

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating order'
    });
  }
};

// Get user orders
exports.getOrders = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      status,
      orderType 
    } = req.query;

    let filter = { user: req.user._id };
    
    if (status) filter.status = status;
    if (orderType) filter.orderType = orderType;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const orders = await Order.find(filter)
      .populate('restaurant', 'name images cuisine')
      .populate('tiffinPlan', 'name images')
      .populate('deliveryAddress')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    const total = await Order.countDocuments(filter);

    res.json({
      success: true,
      data: orders,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching orders'
    });
  }
};

// Get order by ID
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('restaurant', 'name images phone address openingHours')
      .populate('tiffinPlan', 'name images provider')
      .populate('deliveryAddress')
      .populate('rider', 'name phone');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns the order or is admin
    if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching order'
    });
  }
};

// Track order
exports.trackOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .select('orderNumber status tracking expectedDelivery rider');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns the order
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Track order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while tracking order'
    });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check permissions (user can only cancel, admin/restaurant can update)
    if (req.user.role === 'customer') {
      if (status !== 'cancelled') {
        return res.status(403).json({
          success: false,
          message: 'You can only cancel orders'
        });
      }
      
      // Only allow cancellation within 5 minutes of ordering
      const timeDiff = (new Date() - order.createdAt) / (1000 * 60);
      if (timeDiff > 5) {
        return res.status(400).json({
          success: false,
          message: 'Orders can only be cancelled within 5 minutes of placement'
        });
      }
    }

    order.status = status;
    order.tracking.push({
      status,
      description: getStatusDescription(status),
      timestamp: new Date()
    });

    if (status === 'delivered') {
      order.deliveredAt = new Date();
    }

    await order.save();

    res.json({
      success: true,
      message: `Order ${status} successfully`,
      data: order
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating order status'
    });
  }
};

// Cancel order
exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns the order
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Check if order can be cancelled
    if (!['pending', 'confirmed'].includes(order.status)) {
      return res.status(400).json({
        success: false,
        message: 'Order cannot be cancelled at this stage'
      });
    }

    order.status = 'cancelled';
    order.tracking.push({
      status: 'cancelled',
      description: 'Order cancelled by customer',
      timestamp: new Date()
    });

    await order.save();

    res.json({
      success: true,
      message: 'Order cancelled successfully',
      data: order
    });
  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while cancelling order'
    });
  }
};

// Helper function to get status descriptions
function getStatusDescription(status) {
  const descriptions = {
    pending: 'Order received and being processed',
    confirmed: 'Order confirmed by restaurant',
    preparing: 'Food is being prepared',
    ready_for_delivery: 'Order is ready for delivery',
    out_for_delivery: 'Order is out for delivery',
    delivered: 'Order has been delivered',
    cancelled: 'Order has been cancelled'
  };
  
  return descriptions[status] || 'Order status updated';
}