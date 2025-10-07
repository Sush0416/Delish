import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Star, MapPin, Clock } from 'lucide-react';
import { restaurantService } from '../services/restaurantService';

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [selectedRating, setSelectedRating] = useState('');

  useEffect(() => {
    fetchRestaurants();
  }, [searchTerm, selectedCuisine, selectedRating]);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (selectedCuisine) params.cuisine = selectedCuisine;
      if (selectedRating) params.rating = selectedRating;

      const data = await restaurantService.getAllRestaurants(params);
      setRestaurants(data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  const cuisines = ['All', 'Indian', 'Chinese', 'Italian', 'Mexican', 'Thai'];
  const ratings = ['All', '4+', '3+', '2+'];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Restaurants</h1>
          <p className="text-lg text-gray-600">Discover amazing restaurants in your area</p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-md p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search restaurants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* Cuisine Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                value={selectedCuisine}
                onChange={(e) => setSelectedCuisine(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none"
              >
                {cuisines.map((cuisine) => (
                  <option key={cuisine} value={cuisine === 'All' ? '' : cuisine}>
                    {cuisine}
                  </option>
                ))}
              </select>
            </div>

            {/* Rating Filter */}
            <div className="relative">
              <Star className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none"
              >
                {ratings.map((rating) => (
                  <option key={rating} value={rating === 'All' ? '' : rating.replace('+', '')}>
                    {rating}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Restaurants Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {restaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => window.location.href = `/restaurants/${restaurant._id}`}
              >
                <div className="h-48 bg-gray-200 relative">
                  <img
                    src={restaurant.image || '/api/placeholder/400/300'}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-semibold text-gray-800">
                    {restaurant.rating} ⭐
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{restaurant.name}</h3>
                  <p className="text-gray-600 mb-2">{restaurant.cuisine}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {restaurant.address}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {restaurant.deliveryTime} mins
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && restaurants.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No restaurants found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Restaurants;
