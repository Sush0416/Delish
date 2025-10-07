const express = require('express');
const router = express.Router();
const Tiffin = require('../models/Tiffin');

router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 6, type, search } = req.query;
    const query = {};
    if (type) query.type = type;
    if (search) query.name = { $regex: search, $options: 'i' };

    const total = await Tiffin.countDocuments(query);
    const plans = await Tiffin.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({ plans, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch tiffin plans.' });
  }
});

module.exports = router;
