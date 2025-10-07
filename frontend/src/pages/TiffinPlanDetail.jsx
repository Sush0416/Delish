import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Calendar, Clock, Users, CheckCircle, ShoppingCart } from 'lucide-react';
import { tiffinService } from '../services/tiffinService';

const TiffinPlanDetail = () => {
  const { id } = useParams();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlanDetails();
  }, [id]);

  const fetchPlanDetails = async () => {
    try {
      setLoading(true);
      const planData = await tiffinService.getTiffinPlanById(id);
      setPlan(planData);
    } catch (error) {
      console.error('Error fetching plan details:', error);
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

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Plan Not Found</h2>
          <p className="text-gray-600">The tiffin plan you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Plan Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">{plan.name}</h1>
            <p className="text-xl mb-6">{plan.description}</p>
            <div className="flex items-center justify-center space-x-6">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-300 mr-1" />
                <span className="font-semibold">{plan.rating}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-1" />
                <span>{plan.subscribers} subscribers</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-1" />
                <span>{plan.duration} days</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Plan Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Plan Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">What's Included</h3>
                  <ul className="space-y-2">
                    {plan.includes?.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Meal Schedule</h3>
                  <div className="space-y-2">
                    {plan.meals?.map((meal, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-700">{meal.name}</span>
                        <span className="text-gray-500">{meal.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sample Menu */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Sample Menu</h2>
              <div className="space-y-4">
                {plan.sampleMenu?.map((day, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Day {day.day}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {day.meals?.map((meal, mealIndex) => (
                        <div key={mealIndex}>
                          <h4 className="font-medium text-gray-800">{meal.type}</h4>
                          <p className="text-gray-600 text-sm">{meal.items.join(', ')}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Pricing and Subscription */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Subscribe Now</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Original Price:</span>
                  <span className="text-lg line-through text-gray-500">${plan.price}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Discounted Price:</span>
                  <span className="text-2xl font-bold text-orange-600">${plan.discountedPrice || plan.price}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{plan.duration} days</span>
                </div>
              </div>

              <button className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center font-semibold">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Subscribe Now
              </button>

              <div className="mt-6 text-sm text-gray-600">
                <p className="mb-2">✓ Free delivery</p>
                <p className="mb-2">✓ Cancel anytime</p>
                <p>✓ Fresh ingredients</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TiffinPlanDetail;
