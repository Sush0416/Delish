import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Grid, List, ChevronDown } from 'lucide-react';
import TiffinPlanCard from './TiffinPlanCard';

const TiffinServiceSection = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filters = [
    { id: 'all', name: 'All Plans' },
    { id: 'veg', name: 'Vegetarian' },
    { id: 'non-veg', name: 'Non-Vegetarian' },
    { id: 'jain', name: 'Jain' },
    { id: 'diet', name: 'Diet' },
    { id: 'weekly', name: 'Weekly' },
    { id: 'monthly', name: 'Monthly' }
  ];

  // Mock data - replace with actual API call
  const tiffinPlans = [
    {
      id: 1,
      name: 'Premium Vegetarian Thali',
      description: 'Healthy and delicious vegetarian meals with 3 dishes, roti, rice, and dessert',
      type: 'veg',
      duration: 'monthly',
      mealsPerDay: 2,
      price: 4500,
      discountedPrice: 3999,
      features: ['Fresh Ingredients', 'Daily Menu Change', 'Hygienic Packaging'],
      includedItems: [
        {
          mealType: 'lunch',
          items: ['2 Vegetables', 'Dal', 'Roti', 'Rice', 'Salad', 'Sweet']
        },
        {
          mealType: 'dinner',
          items: ['2 Vegetables', 'Dal', 'Roti', 'Rice', 'Salad', 'Buttermilk']
        }
      ],
      rating: 4.8,
      reviews: [],
      images: ['/api/placeholder/400/300'],
      deliveryAreas: ['South Delhi', 'Central Delhi', 'West Delhi']
    },
    // Add more mock plans...
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Tiffin Service Plans
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our carefully curated tiffin plans. Fresh, home-style meals delivered daily to your doorstep.
          </p>
        </motion.div>

        {/* Filters and Controls */}
        <motion.div
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Filter Button */}
          <div className="relative">
            <motion.button
              className="flex items-center space-x-2 bg-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={20} />
              <span>Filters</span>
              <ChevronDown 
                size={16} 
                className={`transition-transform ${showFilters ? 'rotate-180' : ''}`}
              />
            </motion.button>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl p-4 min-w-[200px] z-10"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <div className="grid grid-cols-2 gap-2">
                    {filters.map((filter) => (
                      <button
                        key={filter.id}
                        className={`px-3 py-2 rounded text-sm font-medium transition-all ${
                          selectedFilter === filter.id
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        onClick={() => setSelectedFilter(filter.id)}
                      >
                        {filter.name}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* View Toggle */}
          <div className="flex items-center space-x-2 bg-white rounded-lg shadow-md p-1">
            <button
              className={`p-2 rounded ${
                viewMode === 'grid' 
                  ? 'bg-orange-500 text-white' 
                  : 'text-gray-600 hover:text-orange-500'
              }`}
              onClick={() => setViewMode('grid')}
            >
              <Grid size={20} />
            </button>
            <button
              className={`p-2 rounded ${
                viewMode === 'list' 
                  ? 'bg-orange-500 text-white' 
                  : 'text-gray-600 hover:text-orange-500'
              }`}
              onClick={() => setViewMode('list')}
            >
              <List size={20} />
            </button>
          </div>
        </motion.div>

        {/* Plans Grid */}
        <motion.div
          className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}
          layout
        >
          <AnimatePresence>
            {tiffinPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <TiffinPlanCard plan={plan} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.button
            className="bg-white border-2 border-orange-500 text-orange-500 px-8 py-3 rounded-full font-semibold hover:bg-orange-500 hover:text-white transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Load More Plans
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default TiffinServiceSection;