const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors, validateObjectId } = require('../middleware/validation');
const { auth, optionalAuth } = require('../middleware/auth');
const {
  getRestaurants,
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  addReview,
  getMenu,
  searchRestaurants
} = require('../controllers/restaurantController');

// @route   GET /api/restaurants
// @desc    Get all restaurants with filters
// @access  Public
router.get('/', optionalAuth, getRestaurants);

// @route   GET /api/restaurants/search
// @desc    Search restaurants
// @access  Public
router.get('/search', optionalAuth, searchRestaurants);

// @route   GET /api/restaurants/:id
// @desc    Get restaurant by ID
// @access  Public
router.get('/:id', validateObjectId, optionalAuth, getRestaurant);

// @route   GET /api/restaurants/:id/menu
// @desc    Get restaurant menu
// @access  Public
router.get('/:id/menu', validateObjectId, getMenu);

// @route   POST /api/restaurants
// @desc    Create new restaurant
// @access  Private
router.post('/', [
  auth,
  check('name', 'Restaurant name is required').not().isEmpty().trim(),
  check('description', 'Description is required').not().isEmpty().trim(),
  check('cuisine', 'Cuisine is required').not().isEmpty().trim(),
  check('phone', 'Phone number is required').not().isEmpty().trim()
], handleValidationErrors, createRestaurant);

// @route   PUT /api/restaurants/:id
// @desc    Update restaurant
// @access  Private
router.put('/:id', validateObjectId, auth, updateRestaurant);

// @route   POST /api/restaurants/:id/reviews
// @desc    Add review to restaurant
// @access  Private
router.post('/:id/reviews', [
  validateObjectId,
  auth,
  check('rating', 'Rating is required and must be between 1-5').isInt({ min: 1, max: 5 }),
  check('comment', 'Comment is required').not().isEmpty().trim()
], handleValidationErrors, addReview);

module.exports = router;