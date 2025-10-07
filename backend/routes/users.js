const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors, validateObjectId } = require('../middleware/validation');
const { auth } = require('../middleware/auth');
const { uploadAvatar } = require('../middleware/upload');
const {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
  getFavorites,
  addToFavorites,
  removeFromFavorites,
  uploadAvatar: uploadUserAvatar
} = require('../controllers/userController');

// @route   GET /api/users/addresses
// @desc    Get user addresses
// @access  Private
router.get('/addresses', auth, getAddresses);

// @route   POST /api/users/addresses
// @desc    Add new address
// @access  Private
router.post('/addresses', [
  auth,
  check('label', 'Label is required').isIn(['home', 'work', 'other']),
  check('fullName', 'Full name is required').not().isEmpty().trim(),
  check('phone', 'Phone number is required').not().isEmpty().trim(),
  check('street', 'Street address is required').not().isEmpty().trim(),
  check('city', 'City is required').not().isEmpty().trim(),
  check('state', 'State is required').not().isEmpty().trim(),
  check('zipCode', 'ZIP code is required').not().isEmpty().trim()
], handleValidationErrors, addAddress);

// @route   PUT /api/users/addresses/:id
// @desc    Update address
// @access  Private
router.put('/addresses/:id', validateObjectId, auth, updateAddress);

// @route   DELETE /api/users/addresses/:id
// @desc    Delete address
// @access  Private
router.delete('/addresses/:id', validateObjectId, auth, deleteAddress);

// @route   PUT /api/users/addresses/:id/default
// @desc    Set address as default
// @access  Private
router.put('/addresses/:id/default', validateObjectId, auth, setDefaultAddress);

// @route   GET /api/users/favorites
// @desc    Get user favorites
// @access  Private
router.get('/favorites', auth, getFavorites);

// @route   POST /api/users/favorites
// @desc    Add to favorites
// @access  Private
router.post('/favorites', [
  auth,
  check('restaurantId', 'Restaurant ID is required').not().isEmpty()
], handleValidationErrors, addToFavorites);

// @route   DELETE /api/users/favorites/:id
// @desc    Remove from favorites
// @access  Private
router.delete('/favorites/:id', validateObjectId, auth, removeFromFavorites);

// @route   POST /api/users/avatar
// @desc    Upload user avatar
// @access  Private
router.post('/avatar', auth, uploadAvatar, uploadUserAvatar);

module.exports = router;