const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../middleware/validation');
const { auth } = require('../middleware/auth');
const { 
  register, 
  login, 
  getProfile, 
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword
} = require('../controllers/authController');

// @route   POST /api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', [
  check('name', 'Name is required').not().isEmpty().trim(),
  check('email', 'Please include a valid email').isEmail().normalizeEmail(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  check('phone', 'Phone number is required').not().isEmpty().trim()
], handleValidationErrors, register);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', [
  check('email', 'Please include a valid email').isEmail().normalizeEmail(),
  check('password', 'Password is required').exists()
], handleValidationErrors, login);

// @route   GET /api/auth/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', auth, getProfile);

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, [
  check('name', 'Name is required').optional().not().isEmpty().trim(),
  check('email', 'Please include a valid email').optional().isEmail().normalizeEmail(),
  check('phone', 'Phone number is required').optional().not().isEmpty().trim()
], handleValidationErrors, updateProfile);

// @route   PUT /api/auth/change-password
// @desc    Change password
// @access  Private
router.put('/change-password', auth, [
  check('currentPassword', 'Current password is required').not().isEmpty(),
  check('newPassword', 'New password must be at least 6 characters').isLength({ min: 6 })
], handleValidationErrors, changePassword);

// @route   POST /api/auth/forgot-password
// @desc    Forgot password
// @access  Public
router.post('/forgot-password', [
  check('email', 'Please include a valid email').isEmail().normalizeEmail()
], handleValidationErrors, forgotPassword);

// @route   POST /api/auth/reset-password
// @desc    Reset password
// @access  Public
router.post('/reset-password', [
  check('token', 'Token is required').not().isEmpty(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
], handleValidationErrors, resetPassword);

module.exports = router;