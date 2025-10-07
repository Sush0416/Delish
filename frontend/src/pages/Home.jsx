import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChefHat, Clock, Star, Truck } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Delicious Food
              <span className="block text-orange-600">Delivered Fast</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Order from your favorite restaurants and tiffin services. Fresh, hot, and delivered right to your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/restaurants"
                className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
              >
                Order Now
              </Link>
              <Link
                to="/tiffin-services"
                className="border border-orange-500 text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
              >
                Tiffin Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Delish?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide the best food delivery experience with quality, speed, and convenience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: ChefHat,
                title: 'Quality Food',
                description: 'Fresh ingredients and expert chefs'
              },
              {
                icon: Clock,
                title: 'Fast Delivery',
                description: 'Hot food delivered in 30 minutes'
              },
              {
                icon: Star,
                title: 'Best Ratings',
                description: 'Top-rated restaurants and services'
              },
              {
                icon: Truck,
                title: 'Reliable Service',
                description: 'Track your order in real-time'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-orange-500">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Order?
            </h2>
            <p className="text-orange-100 mb-8 text-lg">
              Join thousands of satisfied customers. Download our app or order online today!
            </p>
            <Link
              to="/restaurants"
              className="bg-white text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Start Ordering
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
