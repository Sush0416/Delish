const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

// Connect to database
connectDB();

const app = express();

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// CORS
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));

// --- Tiffin Plans ---
const tiffins = [
  {
    _id: '1',
    name: 'Veg Delight',
    description: 'Healthy vegetarian meals with fresh vegetables, dal, roti, rice, and salad.',
    price: 150,
    category: 'vegetarian',
    image: '/images/tiffins/veg-delight.jpg',
  },
  {
    _id: '2',
    name: 'Protein Packed',
    description: 'High protein meals with paneer, soy, legumes, and healthy grains.',
    price: 200,
    category: 'vegetarian',
    image: '/images/tiffins/protein-packed.jpg',
  },
  {
    _id: '3',
    name: 'Non-Veg Special',
    description: 'Delicious non-vegetarian meals with chicken, fish, or mutton options.',
    price: 220,
    category: 'non-vegetarian',
    image: '/images/tiffins/non-veg-special.jpg',
  },
  {
    _id: '4',
    name: 'Jain Meals',
    description: 'Pure vegetarian Jain meals without onion and garlic.',
    price: 180,
    category: 'jain',
    image: '/images/tiffins/jain-meals.jpg',
  },
  {
    _id: '5',
    name: 'Eggetarian Delight',
    description: 'Vegetarian meals with egg options, rich in protein.',
    price: 170,
    category: 'eggetarian',
    image: '/images/tiffins/eggetarian-delight.jpg',
  },
  {
    _id: '6',
    name: 'Weight Loss Diet',
    description: 'Specially curated low-calorie meals for weight management.',
    price: 250,
    category: 'vegetarian',
    image: '/images/tiffins/weight-loss-diet.jpg',
  },
];

// --- Restaurants ---
const restaurants = [
  {
    _id: 'r1',
    name: 'SpiceBox Kitchen',
    description: 'Delicious home-style Indian meals with daily menu rotations.',
    rating: 4.6,
    location: 'Mumbai',
    image: '/images/restaurants/spicebox-kitchen.jpg',
  },
  {
    _id: 'r2',
    name: 'GreenLeaf Tiffins',
    description: 'Wholesome vegetarian and vegan tiffins made fresh daily.',
    rating: 4.8,
    location: 'Pune',
    image: '/images/restaurants/greenleaf-tiffins.jpg',
  },
  {
    _id: 'r3',
    name: 'Tandoori Treats',
    description: 'Authentic Punjabi non-veg meals with smoky flavors and soft rotis.',
    rating: 4.7,
    location: 'Delhi',
    image: '/images/restaurants/tandoori-treats.jpg',
  },
  {
    _id: 'r4',
    name: 'South Feast',
    description: 'Traditional South Indian thali with sambhar, rasam, and curd rice.',
    rating: 4.5,
    location: 'Chennai',
    image: '/images/restaurants/south-feast.jpg',
  },
];

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/restaurants', require('./routes/restaurants'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/users', require('./routes/users'));

// Basic routes for now (will be replaced with proper routes)
app.get('/api/tiffins', (req, res) => {
  const { type, search } = req.query;
  let filtered = tiffins;

  if (type && type !== 'all') {
    filtered = filtered.filter(t => t.category.toLowerCase() === type.toLowerCase());
  }

  if (search) {
    const term = search.toLowerCase();
    filtered = filtered.filter(t =>
      t.name.toLowerCase().includes(term) ||
      t.description.toLowerCase().includes(term)
    );
  }

  res.json({ plans: filtered, total: filtered.length });
});

app.get('/api/restaurants', (req, res) => {
  res.json(restaurants);
});

app.get('/', (req, res) => {
  res.json({ message: '🍱 Delish Backend is running successfully!' });
});

// Error handler middleware
app.use(errorHandler);

// Handle undefined routes
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// --- Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  console.log(`✅ Tiffins API → http://localhost:${PORT}/api/tiffins`);
  console.log(`✅ Restaurants API → http://localhost:${PORT}/api/restaurants`);
});
