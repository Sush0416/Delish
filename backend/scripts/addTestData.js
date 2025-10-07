const mongoose = require('mongoose');
const TiffinPlan = require('../models/TiffinPlan');
require('dotenv').config();

const addTestData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/delish-app');

    // Create a test tiffin plan
    const testPlan = new TiffinPlan({
      name: 'Delicious Veg Tiffin',
      description: 'Healthy and tasty vegetarian meals delivered daily',
      type: 'veg',
      duration: 'daily',
      mealsPerDay: 3,
      price: 150,
      discountedPrice: 120,
      features: ['Fresh ingredients', 'Home-style cooking', 'Nutritious meals'],
      includedItems: [
        {
          mealType: 'breakfast',
          items: ['Poha', 'Tea', 'Fruit']
        },
        {
          mealType: 'lunch',
          items: ['Dal', 'Rice', 'Vegetables', 'Roti']
        },
        {
          mealType: 'dinner',
          items: ['Paneer Curry', 'Rice', 'Salad']
        }
      ],
      provider: new mongoose.Types.ObjectId(), // Dummy provider ID
      rating: 4.5,
      deliveryAreas: ['Delhi', 'Noida', 'Gurgaon'],
      isActive: true
    });

    await testPlan.save();
    console.log('Test tiffin plan added successfully!');

    // Add another plan
    const testPlan2 = new TiffinPlan({
      name: 'Premium Non-Veg Tiffin',
      description: 'Delicious non-vegetarian meals with chicken and fish',
      type: 'non-veg',
      duration: 'daily',
      mealsPerDay: 3,
      price: 200,
      discountedPrice: 180,
      features: ['Fresh meat', 'Spicy flavors', 'Protein-rich'],
      includedItems: [
        {
          mealType: 'breakfast',
          items: ['Eggs', 'Paratha', 'Tea']
        },
        {
          mealType: 'lunch',
          items: ['Chicken Curry', 'Rice', 'Salad']
        },
        {
          mealType: 'dinner',
          items: ['Fish Fry', 'Rice', 'Vegetables']
        }
      ],
      provider: new mongoose.Types.ObjectId(), // Dummy provider ID
      rating: 4.2,
      deliveryAreas: ['Delhi', 'Noida'],
      isActive: true
    });

    await testPlan2.save();
    console.log('Second test tiffin plan added successfully!');

    process.exit(0);
  } catch (error) {
    console.error('Error adding test data:', error);
    process.exit(1);
  }
};

addTestData();
