import React from 'react';
import { motion } from 'framer-motion';
import { Play, Shield, Clock, Star } from 'lucide-react';

const AnimatedHero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-red-50 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-orange-200 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Content */}
          <div>
            <motion.h1
              className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6"
              variants={itemVariants}
            >
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Delicious
              </span>
              <br />
              <span className="text-gray-800">Food Delivered</span>
              <br />
              <span className="text-gray-800">to Your Door</span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 mb-8 leading-relaxed"
              variants={itemVariants}
            >
              Experience the finest cuisine from top restaurants and home-style tiffin services. 
              Fresh, healthy meals prepared with love and delivered with care.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-12"
              variants={itemVariants}
            >
              <motion.button
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Order Now
              </motion.button>
              
              <motion.button
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold text-lg hover:border-orange-500 hover:text-orange-500 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center space-x-2">
                  <Play size={20} className="fill-current" />
                  <span>Watch Demo</span>
                </div>
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-8"
              variants={itemVariants}
            >
              {[
                { icon: Star, value: '4.9/5', label: 'Customer Rating' },
                { icon: Clock, value: '30min', label: 'Avg Delivery' },
                { icon: Shield, value: '100%', label: 'Food Safety' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Animated Food Showcase */}
          <motion.div
            className="relative"
            variants={itemVariants}
          >
            <div className="relative w-full max-w-lg mx-auto">
              {/* Main Food Image */}
              <motion.div
                className="relative z-10 bg-white rounded-3xl shadow-2xl overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src="/api/placeholder/400/400"
                  alt="Featured Dish"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <h3 className="text-white text-xl font-bold mb-2">Special Thali</h3>
                  <p className="text-orange-300">Fresh & Healthy • Ready in 30min</p>
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg p-4 z-20"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold">Live Tracking</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg p-4 z-20"
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500">₹299</div>
                  <div className="text-xs text-gray-600">Starting at</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-gray-400 rounded-full mt-2"
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default AnimatedHero;