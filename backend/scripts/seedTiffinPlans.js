const mongoose = require('mongoose');
const TiffinPlan = require('../models/TiffinPlan');
const User = require('../models/User');

const sampleTiffinPlans = [
  {
    name: 'Premium Vegetarian Tiffin',
    description: 'Healthy and delicious vegetarian meals with seasonal vegetables and traditional spices',
    type: 'veg',
    duration: 'monthly',
    mealsPerDay: 3,
    price: 2500,
    discountedPrice: 2200,
    features: [
      'Fresh seasonal vegetables',
      'Traditional Indian spices',
      'Nutritious and balanced meals',
      'Home-style cooking',
      'Customizable spice levels'
    ],
    includedItems: [
      {
        mealType: 'breakfast',
        items: ['Poha', 'Upma', 'Idli', 'Dosa']
      },
      {
        mealType: 'lunch',
        items: ['Dal', 'Rice', 'Vegetable Curry', 'Raita', 'Chapati']
      },
      {
        mealType: 'dinner',
        items: ['Dal', 'Rice', 'Paneer Curry', 'Salad', 'Chapati']
      }
    ],
    rating: 4.5,
    deliveryAreas: ['Delhi', 'Noida', 'Gurgaon', 'Faridabad'],
    images: ['/images/tiffin-veg-1.jpg']
  },
  {
    name: 'Non-Vegetarian Special',
    description: 'Protein-rich non-vegetarian meals with chicken and fish preparations',
    type: 'non-veg',
    duration: 'monthly',
    mealsPerDay: 3,
    price: 3200,
    discountedPrice: 2800,
    features: [
      'Fresh chicken and fish',
      'Authentic non-veg recipes',
      'High protein content',
      'Marinated and grilled items',
      'Spice level customization'
    ],
    includedItems: [
      {
        mealType: 'breakfast',
        items: ['Egg Bhurji', 'Chicken Sausage', 'Paratha']
      },
      {
        mealType: 'lunch',
        items: ['Chicken Curry', 'Rice', 'Fish Fry', 'Dal', 'Chapati']
      },
      {
        mealType: 'dinner',
        items: ['Mutton Curry', 'Rice', 'Chicken Biryani', 'Raita']
      }
    ],
    rating: 4.7,
    deliveryAreas: ['Delhi', 'Noida', 'Gurgaon'],
    images: ['/images/tiffin-nonveg-1.jpg']
  },
  {
    name: 'Jain Vegetarian Delight',
    description: 'Pure Jain vegetarian meals without onion, garlic, and root vegetables',
    type: 'jain',
    duration: 'monthly',
    mealsPerDay: 3,
    price: 2400,
    discountedPrice: 2100,
    features: [
      'No onion, garlic, or root vegetables',
      'Pure Jain preparation',
      'Traditional Jain recipes',
      'Satvik and healthy',
      'Festival special meals'
    ],
    includedItems: [
      {
        mealType: 'breakfast',
        items: ['Dhokla', 'Khichdi', 'Poha', 'Mathri']
      },
      {
        mealType: 'lunch',
        items: ['Dal', 'Rice', 'Paneer', 'Khichdi', 'Chapati']
      },
      {
        mealType: 'dinner',
        items: ['Dal', 'Rice', 'Khichdi', 'Salad', 'Chapati']
      }
    ],
    rating: 4.3,
    deliveryAreas: ['Delhi', 'Jaipur', 'Udaipur', 'Ahmedabad'],
    images: ['/images/tiffin-jain-1.jpg']
  },
  {
    name: 'Diet & Wellness Plan',
    description: 'Low-calorie, high-nutrition meals designed for weight management and wellness',
    type: 'diet',
    duration: 'monthly',
    mealsPerDay: 3,
    price: 2800,
    discountedPrice: 2500,
    features: [
      'Calorie-controlled meals',
      'High fiber content',
      'Low oil and sugar',
      'Nutrient-dense ingredients',
      'Weight management support'
    ],
    includedItems: [
      {
        mealType: 'breakfast',
        items: ['Oatmeal', 'Smoothie Bowl', 'Fruit Salad', 'Sprouts']
      },
      {
        mealType: 'lunch',
        items: ['Grilled Chicken Salad', 'Quinoa Bowl', 'Steamed Vegetables', 'Soup']
      },
      {
        mealType: 'dinner',
        items: ['Fish Curry (light)', 'Brown Rice', 'Steamed Vegetables', 'Herb Tea']
      }
    ],
    rating: 4.4,
    deliveryAreas: ['Delhi', 'Mumbai', 'Bangalore', 'Chennai'],
    images: ['/images/tiffin-diet-1.jpg']
  },
  {
    name: 'Weekly Trial Pack',
    description: 'Try our service with a 7-day trial pack at special introductory rates',
    type: 'veg',
    duration: 'weekly',
    mealsPerDay: 3,
    price: 700,
    discountedPrice: 600,
    features: [
      '7-day trial period',
      'Variety of meals',
      'Flexible cancellation',
      'Introductory pricing',
      'Quality guarantee'
    ],
    includedItems: [
      {
        mealType: 'breakfast',
        items: ['Poha', 'Upma', 'Idli', 'Dosa']
      },
      {
        mealType: 'lunch',
        items: ['Dal', 'Rice', 'Vegetable Curry', 'Raita', 'Chapati']
      },
      {
        mealType: 'dinner',
        items: ['Dal', 'Rice', 'Paneer Curry', 'Salad', 'Chapati']
      }
    ],
    rating: 4.6,
    deliveryAreas: ['Delhi', 'Noida', 'Gurgaon', 'Faridabad', 'Ghaziabad'],
    images: ['/images/tiffin-trial-1.jpg']
  }
];

const seedTiffinPlans = async () => {
  try {
    console.log('Seeding tiffin plans...');

    // Find a provider user (tiffin provider)
    let provider = await User.findOne({ role: 'provider' });

    if (!provider) {
      // Create a sample provider if none exists
      provider = new User({
        name: 'Delhi Tiffin Services',
        email: 'provider@delishtiffin.com',
        password: 'provider123',
        phone: '+91 9876543210',
        role: 'provider',
        isTiffinProvider: true
      });
      await provider.save();
      console.log('Created sample provider:', provider._id);
    }

    // Add provider to all plans
    const plansWithProvider = sampleTiffinPlans.map(plan => ({
      ...plan,
      provider: provider._id
    }));

    // Insert plans
    const insertedPlans = await TiffinPlan.insertMany(plansWithProvider);
    console.log(`Successfully seeded ${insertedPlans.length} tiffin plans`);

    // Update provider's tiffin plans
    await User.findByIdAndUpdate(provider._id, {
      $push: { tiffinPlans: { $each: insertedPlans.map(plan => plan._id) } }
    });

    console.log('Tiffin plans seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding tiffin plans:', error);
    process.exit(1);
  }
};

// Run the seeder
seedTiffinPlans();
