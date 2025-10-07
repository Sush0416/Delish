const User = require('../models/User');
const Address = require('../models/Address');
const Restaurant = require('../models/Restaurant');

// Get user addresses
exports.getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user._id })
      .sort({ isDefault: -1, createdAt: -1 });

    res.json({
      success: true,
      data: addresses
    });
  } catch (error) {
    console.error('Get addresses error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching addresses'
    });
  }
};

// Add new address
exports.addAddress = async (req, res) => {
  try {
    const {
      label,
      fullName,
      phone,
      street,
      landmark,
      city,
      state,
      zipCode,
      country,
      instructions,
      isDefault = false
    } = req.body;

    // If setting as default, update other addresses
    if (isDefault) {
      await Address.updateMany(
        { user: req.user._id },
        { $set: { isDefault: false } }
      );
    }

    const address = new Address({
      user: req.user._id,
      label,
      fullName,
      phone,
      street,
      landmark,
      city,
      state,
      zipCode,
      country,
      instructions,
      isDefault
    });

    await address.save();

    // Add address to user's addresses array
    await User.findByIdAndUpdate(req.user._id, {
      $push: { addresses: address._id }
    });

    res.status(201).json({
      success: true,
      message: 'Address added successfully',
      data: address
    });
  } catch (error) {
    console.error('Add address error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while adding address'
    });
  }
};

// Update address
exports.updateAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);

    if (!address) {
      return res.status(404).json({
        success: false,
        message: 'Address not found'
      });
    }

    // Check if user owns the address
    if (address.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const updatedAddress = await Address.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Address updated successfully',
      data: updatedAddress
    });
  } catch (error) {
    console.error('Update address error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating address'
    });
  }
};

// Delete address
exports.deleteAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);

    if (!address) {
      return res.status(404).json({
        success: false,
        message: 'Address not found'
      });
    }

    // Check if user owns the address
    if (address.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    await Address.findByIdAndDelete(req.params.id);

    // Remove address from user's addresses array
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { addresses: req.params.id }
    });

    res.json({
      success: true,
      message: 'Address deleted successfully'
    });
  } catch (error) {
    console.error('Delete address error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting address'
    });
  }
};

// Set address as default
exports.setDefaultAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);

    if (!address) {
      return res.status(404).json({
        success: false,
        message: 'Address not found'
      });
    }

    // Check if user owns the address
    if (address.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Update all addresses to not default
    await Address.updateMany(
      { user: req.user._id },
      { $set: { isDefault: false } }
    );

    // Set this address as default
    address.isDefault = true;
    await address.save();

    res.json({
      success: true,
      message: 'Default address updated successfully',
      data: address
    });
  } catch (error) {
    console.error('Set default address error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while setting default address'
    });
  }
};

// Get user favorites
exports.getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('favorites', 'name images cuisine rating deliveryInfo');

    res.json({
      success: true,
      data: user.favorites
    });
  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching favorites'
    });
  }
};

// Add to favorites
exports.addToFavorites = async (req, res) => {
  try {
    const { restaurantId } = req.body;

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found'
      });
    }

    const user = await User.findById(req.user._id);

    // Check if already in favorites
    if (user.favorites.includes(restaurantId)) {
      return res.status(400).json({
        success: false,
        message: 'Restaurant already in favorites'
      });
    }

    user.favorites.push(restaurantId);
    await user.save();

    res.json({
      success: true,
      message: 'Added to favorites successfully',
      data: user.favorites
    });
  } catch (error) {
    console.error('Add to favorites error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while adding to favorites'
    });
  }
};

// Remove from favorites
exports.removeFromFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    // Check if restaurant is in favorites
    if (!user.favorites.includes(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Restaurant not in favorites'
      });
    }

    user.favorites = user.favorites.filter(
      fav => fav.toString() !== req.params.id
    );
    await user.save();

    res.json({
      success: true,
      message: 'Removed from favorites successfully',
      data: user.favorites
    });
  } catch (error) {
    console.error('Remove from favorites error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while removing from favorites'
    });
  }
};

// Upload user avatar
exports.uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const avatarPath = `/uploads/avatars/${req.file.filename}`;

    // Update user avatar
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar: avatarPath },
      { new: true }
    ).select('-password');

    res.json({
      success: true,
      message: 'Avatar uploaded successfully',
      data: {
        avatar: avatarPath,
        user
      }
    });
  } catch (error) {
    console.error('Upload avatar error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while uploading avatar'
    });
  }
};