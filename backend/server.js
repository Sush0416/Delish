const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Tiffins data matching your image files
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
  },
  {
    _id: '4',
    name: 'Jain Meals',
    description: 'Pure vegetarian Jain meals without onion and garlic.',
    price: 180,
    category: 'jain',
    image: '/images/tiffins/jain-meals.jpg',
    available: true
  },
  {
    _id: '5',
    name: 'Eggetarian Delight',
    description: 'Vegetarian meals with egg options, rich in protein.',
    price: 170,
    category: 'eggetarian',
    image: '/images/tiffins/eggetarian-delight.jpg',
    available: true
  },
  {
    _id: '6',
    name: 'Weight Loss Diet',
    description: 'Specially curated low-calorie meals for weight management.',
    price: 250,
    category: 'vegetarian',
    image: '/images/tiffins/weight-loss-diet.jpg',
    available: true
  },
  {
    _id: '7',
    name: 'South Indian Meals',
    description: 'Authentic South Indian meals with sambar, rasam, and curd rice.',
    price: 190,
    category: 'vegetarian',
    image: '/images/tiffins/south-indian-meals.jpg',
    available: true
  },
  {
    _id: '8',
    name: 'Punjabi Tadka',
    description: 'North Indian specialities with butter naan and paneer butter masala.',
    price: 210,
    category: 'vegetarian',
    image: '/images/tiffins/punjabi-tadka.jpg',
    available: true
  },
  {
    _id: '9',
    name: 'Seafood Lovers',
    description: 'Fresh seafood delights including fish curry and prawn masala.',
    price: 280,
    category: 'non-vegetarian',
    image: '/images/tiffins/seafood-lovers.jpg',
    available: true
  },
  {
    _id: '10',
    name: 'Keto Diet Plan',
    description: 'Low-carb, high-fat keto meals perfect for weight loss.',
    price: 300,
    category: 'non-vegetarian',
    image: '/images/tiffins/keto-diet-plan.jpg',
    available: true
  }
];

// Routes
app.get('/api/tiffins', (req, res) => {
  res.json(tiffins);
});

app.get('/', (req, res) => {
  res.json({ message: 'Delish Backend is running!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`✅ Tiffins API: http://localhost:${PORT}/api/tiffins`);
});