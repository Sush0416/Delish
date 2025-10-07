const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { uploadMultiple } = require('../middleware/upload');

// @route   POST /api/upload
// @desc    Upload multiple images
// @access  Private
router.post('/', auth, uploadMultiple, async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded'
      });
    }

    const filePaths = req.files.map(file => ({
      url: `/uploads/images/${file.filename}`,
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype
    }));

    res.json({
      success: true,
      message: 'Files uploaded successfully',
      data: filePaths
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while uploading files'
    });
  }
});

module.exports = router;