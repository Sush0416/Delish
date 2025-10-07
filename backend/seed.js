require('dotenv').config();
const mongoose = require('mongoose');
const Tiffin = require('./models/Tiffin');

const samplePlans = [
  { name: 'Veg Delight', type: 'veg', price: 150, image: 'https://www.indianveggiedelight.com/wp-content/uploads/2020/08/Healthy-Kids-Lunch-Box-Recipes-Indian-Veggie-Delight.jpg', restaurant: 'Green Leaf' },
  { name: 'Protein Packed', type: 'diet', price: 200, image: 'https://theforkedspoon.com/wp-content/uploads/2019/07/Protein-Snack-Pack-Meal-Prep.jpg', restaurant: 'Fit Meals' },
  { name: 'Non-Veg Special', type: 'non-veg', price: 220, image: 'https://homedelighttiffin.ca/wp-content/uploads/2021/09/Chicken-Dum-Biryani.jpg', restaurant: "Carnivore's Corner" },
  { name: 'Jain Tiffin', type: 'jain', price: 180, image: 'https://www.vegrecipesofindia.com/wp-content/uploads/2020/07/jain-food.jpg', restaurant: 'Pure Jain Kitchen' },
  { name: 'Weekly Thali', type: 'weekly', price: 900, image: 'https://static.toiimg.com/thumb/72975551.cms?imgsize=1200x900', restaurant: 'Thali House' },
  { name: 'Monthly Tiffin', type: 'monthly', price: 3500, image: 'https://www.vegrecipesofindia.com/wp-content/uploads/2020/03/thali.jpg', restaurant: 'Daily Tiffins Co.' },
  { name: 'Chef Special Combo', type: 'non-veg', price: 250, image: 'https://www.cookwithmanali.com/wp-content/uploads/2020/03/Chicken-Curry-1.jpg', restaurant: 'Chef\'s Delight' },
  { name: 'Healthy Lunch Box', type: 'diet', price: 180, image: 'https://www.healthylittlefoodies.com/wp-content/uploads/2022/04/Healthy-Lunch-Box.jpg', restaurant: 'NutriMeals' }
];

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('MongoDB connected. Seeding data...');
  await Tiffin.deleteMany({});
  await Tiffin.insertMany(samplePlans);
  console.log('Data seeded successfully');
  process.exit();
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});
