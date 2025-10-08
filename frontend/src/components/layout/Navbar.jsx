import React from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, Menu } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <div className="bg-orange-500 text-white rounded-full w-9 h-9 flex items-center justify-center text-lg font-bold">
            🍽️
          </div>
          <Link
            to="/"
            className="text-2xl font-semibold text-orange-600 hover:text-orange-700 transition"
          >
            Delish
          </Link>
        </div>

        {/* Center Menu - Hidden on small screens */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-orange-600 font-medium">
            Home
          </Link>
          <Link to="/restaurants" className="hover:text-orange-600 font-medium">
            Restaurants
          </Link>
          <Link to="/tiffin-services" className="hover:text-orange-600 font-medium">
            Tiffin Services
          </Link>
          <Link to="/about" className="hover:text-orange-600 font-medium">
            About
          </Link>
          <Link to="/contact" className="hover:text-orange-600 font-medium">
            Contact
          </Link>
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <Search className="w-5 h-5 text-gray-700 hover:text-orange-600 cursor-pointer" />
          <ShoppingCart className="w-5 h-5 text-gray-700 hover:text-orange-600 cursor-pointer" />
          <Link
            to="/login"
            className="text-gray-800 font-medium hover:text-orange-600 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-orange-500 text-white px-4 py-1.5 rounded-md hover:bg-orange-600 transition"
          >
            Sign Up
          </Link>
          <Menu className="w-6 h-6 text-gray-700 md:hidden cursor-pointer" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
