import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, Utensils } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';

const AnimatedHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'Restaurants', path: '/restaurants' },
    { name: 'Tiffin Service', path: '/tiffin-services' },
    { name: 'My Orders', path: '/orders' }
  ];

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <Utensils className="text-white w-5 h-5" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Delish
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <motion.div key={item.name}>
                <Link
                  to={item.path}
                  className={`font-medium transition-colors relative ${
                    location.pathname === item.path
                      ? 'text-orange-500'
                      : 'text-gray-700 hover:text-orange-500'
                  }`}
                >
                  {item.name}
                  {location.pathname === item.path && (
                    <motion.div
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-orange-500"
                      layoutId="underline"
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <motion.button
              className="p-2 text-gray-600 hover:text-orange-500 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search size={20} />
            </motion.button>
            
            {/* Cart */}
            <motion.button
              className="p-2 text-gray-600 hover:text-orange-500 transition-colors relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link to="/checkout">
                <ShoppingCart size={20} />
                {cartItemsCount > 0 && (
                  <motion.span
                    className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    {cartItemsCount}
                  </motion.span>
                )}
              </Link>
            </motion.button>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <motion.button
                  className="flex items-center space-x-2 p-2 text-gray-600 hover:text-orange-500 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  <User size={20} />
                  <span className="hidden sm:block text-sm font-medium">
                    {user.name}
                  </span>
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-700 hover:text-orange-500 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 text-gray-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              className="mt-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for restaurants, tiffin services, or dishes..."
                  className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-3.5 text-gray-400 w-4 h-4" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden mt-4 bg-white rounded-lg shadow-xl p-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col space-y-4">
                {navigationItems.map((item) => (
                  <motion.div key={item.name}>
                    <Link
                      to={item.path}
                      className={`block py-2 font-medium transition-colors ${
                        location.pathname === item.path
                          ? 'text-orange-500'
                          : 'text-gray-700 hover:text-orange-500'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                {!user && (
                  <>
                    <Link
                      to="/login"
                      className="block py-2 text-gray-700 hover:text-orange-500 font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block py-2 bg-orange-500 text-white text-center rounded-lg hover:bg-orange-600 font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default AnimatedHeader;