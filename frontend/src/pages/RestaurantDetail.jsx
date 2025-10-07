import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock, Phone, ShoppingCart } from 'lucide-react';
import { restaurantService } from '../services/restaurantService';

const RestaurantDetail = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRestaurantDetails();
  }, [id]);

  const fetchRestaurantDetails = async () => {
    try {
      setLoading(true);
      const restaurantData = await restaurantService.getRestaurantById(id);
      setRestaurant(restaurantData);
      // In a real app, you'd fetch menu items separately
      setMenu(restaurantData.menu || []);
    } catch (error) {
      console.error('Error fetching restaurant details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Restaurant Not Found</h2>
          <p className="text-gray-600">The restaurant you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Restaurant Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-96 bg-gray-200"
      >
        <img
          src={restaurant.image || '/api/placeholder/1200/400'}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute bottom-8 left-8 text-white">
          <h1 className="text-4xl font-bold mb-2">{restaurant.name}</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-400 mr-1" />
              <span className="font-semibold">{restaurant.rating}</span>
            </div>
            <span>{restaurant.cuisine}</span>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{restaurant.deliveryTime} mins</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Restaurant Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Restaurant Info</h2>
              <div className="space-y-3">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-gray-900 font-medium">Address</p>
                    <p className="text-gray-600">{restaurant.address}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-gray-900 font-medium">Phone</p>
                    <p className="text-gray-600">{restaurant.phone || 'Not available'}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-gray-900 font-medium">Delivery Time</p>
                    <p className="text-gray-600">{restaurant.deliveryTime} minutes</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Menu */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Menu</h2>
              {menu.length > 0 ? (
                <div className="space-y-4">
                  {menu.map((item) => (
                    <div key={item._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                        <p className="text-orange-600 font-semibold mt-1">${item.price}</p>
                      </div>
                      <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">Menu not available</p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
