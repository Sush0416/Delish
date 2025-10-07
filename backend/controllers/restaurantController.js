const Restaurant = require('../models/Restaurant');
const Order = require('../models/Order');

// Get all restaurants with filters
exports.getRestaurants = async (req, res) => {
  try {
    const {
      cuisine,
      minRating,
      maxDeliveryTime,
      isFeatured,
      search,
      sortBy = 'rating',
      page = 1,
      limit = 12
    } = req.query;

    let filter = { isActive: true };
    
    // Apply filters
    if (cuisine) filter.cuisine = new RegExp(cuisine, 'i');
    if (minRating) filter.rating = { $gte: parseFloat(minRating) };
    if (maxDeliveryTime) filter['deliveryInfo.deliveryTime'] = { $lte: parseInt(maxDeliveryTime) };
    if (isFeatured !== undefined) filter.isFeatured = isFeatured === 'true';
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { cuisine: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Sort options
    const sortOptions = {};
    switch (sortBy) {
      case 'rating':
        sortOptions.rating = -1;
        break;
      case 'delivery_time':
        sortOptions['deliveryInfo.deliveryTime'] = 1;
        break;
      case 'delivery_fee':
        sortOptions['deliveryInfo.deliveryFee'] = 1;
        break;
      case 'newest':
        sortOptions.createdAt = -1;
        break;
      default:
        sortOptions.rating = -1;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const restaurants = await Restaurant.find(filter)
      .populate('owner', 'name avatar')
      .populate('reviews.user', 'name avatar')
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    const total = await Restaurant.countDocuments(filter);

    res.json({
      success: true,
      data: restaurants,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get restaurants error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching restaurants'
    });
  }
};

// Search restaurants
exports.searchRestaurants = async (req, res) => {
  try {
    const { q, latitude, longitude, radius = 5 } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    let filter = {
      isActive: true,
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { cuisine: { $regex: q, $options: 'i' } },
        { 'menu.items.name': { $regex: q, $options: 'i' } },
        { tags: { $in: [new RegExp(q, 'i')] } }
      ]
    };

    // Add location filter if coordinates provided
    if (latitude && longitude) {
      filter.location = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: parseInt(radius) * 1000 // Convert km to meters
        }
      };
    }

    const restaurants = await Restaurant.find(filter)
      .populate('owner', 'name avatar')
      .populate('reviews.user', 'name avatar')
      .limit(20)
      .lean();

    res.json({
      success: true,
      data: restaurants
    });
  } catch (error) {
    console.error('Search restaurants error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while searching restaurants'
    });
  }
};

// Get restaurant by ID
exports.getRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id)
      .populate('owner', 'name avatar phone')
      .populate('reviews.user', 'name avatar');

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found'
      });
    }

    res.json({
      success: true,
      data: restaurant
    });
  } catch (error) {
    console.error('Get restaurant error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching restaurant'
    });
  }
};

// Get restaurant menu
exports.getMenu = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id)
      .select('name menu');

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found'
      });
    }

    res.json({
      success: true,
      data: {
        restaurant: {
          id: restaurant._id,
          name: restaurant.name
        },
        menu: restaurant.menu
      }
    });
  } catch (error) {
    console.error('Get menu error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching menu'
    });
  }
};

// Create new restaurant
exports.createRestaurant = async (req, res) => {
  try {
    const {
      name,
      description,
      cuisine,
      address,
      phone,
      email,
      openingHours,
      deliveryInfo,
      menu,
      tags
    } = req.body;

    const restaurant = new Restaurant({
      name,
      description,
      cuisine,
      address,
      phone,
      email,
      openingHours,
      deliveryInfo,
      menu,
      tags,
      owner: req.user._id
    });

    await restaurant.save();

    res.status(201).json({
      success: true,
      message: 'Restaurant created successfully',
      data: restaurant
    });
  } catch (error) {
    console.error('Create restaurant error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating restaurant'
    });
  }
};

// Update restaurant
exports.updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found'
      });
    }

    // Check if user owns the restaurant or is admin
    if (restaurant.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only update your own restaurants.'
      });
    }

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('owner', 'name avatar');

    res.json({
      success: true,
      message: 'Restaurant updated successfully',
      data: updatedRestaurant
    });
  } catch (error) {
    console.error('Update restaurant error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating restaurant'
    });
  }
};

// Add review to restaurant
exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const restaurantId = req.params.id;

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found'
      });
    }

    // Check if user has ordered from this restaurant
    const hasOrdered = await Order.findOne({
      user: req.user._id,
      restaurant: restaurantId,
      status: 'delivered'
    });

    if (!hasOrdered) {
      return res.status(403).json({
        success: false,
        message: 'You can only review restaurants you have ordered from'
      });
    }

    // Check if user has already reviewed
    const existingReview = restaurant.reviews.find(
      review => review.user.toString() === req.user._id.toString()
    );

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this restaurant'
      });
    }

    const newReview = {
      user: req.user._id,
      rating,
      comment,
      createdAt: new Date()
    };

    restaurant.reviews.unshift(newReview);

    // Update average rating
    const totalRatings = restaurant.reviews.length;
    const totalScore = restaurant.reviews.reduce((sum, review) => sum + review.rating, 0);
    restaurant.rating = totalScore / totalRatings;
    restaurant.totalRatings = totalRatings;

    await restaurant.save();

    res.json({
      success: true,
      message: 'Review added successfully',
      data: restaurant.reviews[0]
    });
  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while adding review'
    });
  }
};