const TiffinPlan = require('../models/TiffinPlan');
const TiffinSubscription = require('../models/TiffinSubscription');
const User = require('../models/User');
const Order = require('../models/Order');

// Get all tiffin plans with filters
exports.getTiffinPlans = async (req, res) => {
  try {
    const { 
      cuisine, 
      type, 
      duration, 
      minPrice, 
      maxPrice,
      search,
      sortBy = 'rating',
      page = 1,
      limit = 10
    } = req.query;

    let filter = { isActive: true };
    
    // Apply filters
    if (cuisine) filter.cuisine = cuisine;
    if (type) filter.type = type;
    if (duration) filter.duration = duration;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { 'providerDetails.businessName': { $regex: search, $options: 'i' } }
      ];
    }

    // Sort options
    const sortOptions = {};
    if (sortBy === 'rating') sortOptions.rating = -1;
    else if (sortBy === 'price_low') sortOptions.price = 1;
    else if (sortBy === 'price_high') sortOptions.price = -1;
    else if (sortBy === 'newest') sortOptions.createdAt = -1;
    else sortOptions.rating = -1;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const plans = await TiffinPlan.find(filter)
      .populate('provider', 'name avatar providerDetails')
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    const total = await TiffinPlan.countDocuments(filter);

    res.json({
      success: true,
      data: plans,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get tiffin plans error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error while fetching tiffin plans' 
    });
  }
};

// Get single tiffin plan
exports.getTiffinPlan = async (req, res) => {
  try {
    const plan = await TiffinPlan.findById(req.params.id)
      .populate('provider', 'name avatar providerDetails rating')
      .populate('reviews.user', 'name avatar');

    if (!plan) {
      return res.status(404).json({ 
        success: false,
        message: 'Tiffin plan not found' 
      });
    }

    res.json({
      success: true,
      data: plan
    });
  } catch (error) {
    console.error('Get tiffin plan error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error while fetching tiffin plan' 
    });
  }
};

// Create new tiffin plan
exports.createTiffinPlan = async (req, res) => {
  try {
    const {
      name,
      description,
      type,
      duration,
      mealsPerDay,
      price,
      discountedPrice,
      features,
      includedItems,
      deliveryAreas,
      deliveryTime,
      minSubscriptionDays
    } = req.body;

    // Check if user is a provider
    if (!req.user.isTiffinProvider && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only tiffin providers can create plans'
      });
    }

    const plan = new TiffinPlan({
      name,
      description,
      type,
      duration,
      mealsPerDay,
      price,
      discountedPrice,
      features,
      includedItems,
      deliveryAreas,
      deliveryTime,
      minSubscriptionDays,
      provider: req.user._id
    });

    await plan.save();

    res.status(201).json({
      success: true,
      message: 'Tiffin plan created successfully',
      data: plan
    });
  } catch (error) {
    console.error('Create tiffin plan error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error while creating tiffin plan' 
    });
  }
};

// Subscribe to tiffin plan
exports.subscribeToPlan = async (req, res) => {
  try {
    const {
      planId,
      startDate,
      deliveryAddress,
      preferences
    } = req.body;

    const plan = await TiffinPlan.findById(planId);
    if (!plan) {
      return res.status(404).json({ 
        success: false,
        message: 'Tiffin plan not found' 
      });
    }

    if (!plan.isActive) {
      return res.status(400).json({ 
        success: false,
        message: 'This tiffin plan is not currently available' 
      });
    }

    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(end.getDate() + 30); // 30-day subscription

    const subscription = new TiffinSubscription({
      user: req.user._id,
      plan: planId,
      startDate: start,
      endDate: end,
      deliveryAddress,
      preferences: preferences || {},
      totalAmount: plan.discountedPrice || plan.price,
      nextDeliveryDate: start
    });

    await subscription.save();

    // Create order for the subscription
    const order = new Order({
      orderNumber: `SUB-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      user: req.user._id,
      tiffinPlan: planId,
      orderType: 'tiffin',
      items: [{
        name: plan.name,
        price: plan.discountedPrice || plan.price,
        quantity: 1,
        itemTotal: plan.discountedPrice || plan.price
      }],
      subtotal: plan.discountedPrice || plan.price,
      totalAmount: plan.discountedPrice || plan.price,
      deliveryAddress,
      paymentMethod: 'card', // Default, can be changed
      status: 'confirmed'
    });

    await order.save();

    // Update user's subscriptions
    await User.findByIdAndUpdate(req.user._id, {
      $push: { 
        tiffinSubscriptions: subscription._id,
        orders: order._id
      }
    });

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to tiffin plan',
      data: {
        subscription,
        order
      }
    });
  } catch (error) {
    console.error('Subscribe to plan error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error while subscribing to plan' 
    });
  }
};

// Get user's tiffin subscriptions
exports.getUserSubscriptions = async (req, res) => {
  try {
    const subscriptions = await TiffinSubscription.find({ user: req.user._id })
      .populate('plan')
      .populate('deliveryAddress')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: subscriptions
    });
  } catch (error) {
    console.error('Get user subscriptions error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error while fetching subscriptions' 
    });
  }
};

// Pause subscription
exports.pauseSubscription = async (req, res) => {
  try {
    const subscription = await TiffinSubscription.findById(req.params.id);

    if (!subscription) {
      return res.status(404).json({ 
        success: false,
        message: 'Subscription not found' 
      });
    }

    if (subscription.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ 
        success: false,
        message: 'Access denied' 
      });
    }

    subscription.status = 'paused';
    await subscription.save();

    res.json({
      success: true,
      message: 'Subscription paused successfully',
      data: subscription
    });
  } catch (error) {
    console.error('Pause subscription error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error while pausing subscription' 
    });
  }
};

// Resume subscription
exports.resumeSubscription = async (req, res) => {
  try {
    const subscription = await TiffinSubscription.findById(req.params.id);

    if (!subscription) {
      return res.status(404).json({ 
        success: false,
        message: 'Subscription not found' 
      });
    }

    if (subscription.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ 
        success: false,
        message: 'Access denied' 
      });
    }

    subscription.status = 'active';
    subscription.nextDeliveryDate = new Date(); // Reset to today
    await subscription.save();

    res.json({
      success: true,
      message: 'Subscription resumed successfully',
      data: subscription
    });
  } catch (error) {
    console.error('Resume subscription error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error while resuming subscription' 
    });
  }
};

// Add review to tiffin plan
exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const planId = req.params.id;

    const plan = await TiffinPlan.findById(planId);
    if (!plan) {
      return res.status(404).json({ 
        success: false,
        message: 'Tiffin plan not found' 
      });
    }

    // Check if user has subscribed to this plan
    const subscription = await TiffinSubscription.findOne({
      user: req.user._id,
      plan: planId,
      status: 'active'
    });

    if (!subscription) {
      return res.status(403).json({ 
        success: false,
        message: 'You can only review plans you are subscribed to' 
      });
    }

    const newReview = {
      user: req.user._id,
      rating,
      comment,
      createdAt: new Date()
    };

    plan.reviews.unshift(newReview);

    // Update average rating
    const totalRatings = plan.reviews.length;
    const totalScore = plan.reviews.reduce((sum, review) => sum + review.rating, 0);
    plan.rating = totalScore / totalRatings;

    await plan.save();

    res.json({
      success: true,
      message: 'Review added successfully',
      data: plan.reviews[0]
    });
  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error while adding review' 
    });
  }
};