const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const tiffins = [
      {
        _id: '1',
        name: 'Veg Delight',
        description: 'Healthy vegetarian meals with fresh vegetables, dal, roti, rice, and salad.',
        price: 150,
        category: 'vegetarian',
        image: '/images/tiffins/veg-delight.jpg',
        available: true
      },
      {
        _id: '2',
        name: 'Protein Packed',
        description: 'High protein meals with paneer, soy, legumes, and healthy grains.',
        price: 200,
        category: 'vegetarian',
        image: '/images/tiffins/protein-packed.jpg',
        available: true
      },
      {
        _id: '3',
        name: 'Non-Veg Special',
        description: 'Delicious non-vegetarian meals with chicken, fish, or mutton options.',
        price: 220,
        category: 'non-vegetarian',
        image: '/images/tiffins/non-veg-special.jpg',
        available: true
      }
    ];
    res.json(tiffins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;