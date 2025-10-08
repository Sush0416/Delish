import React, { useEffect, useState } from "react";
import { Loader, Star, Clock, MapPin, Heart, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Restaurants.css";

const Restaurants = () => {
  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [favorites, setFavorites] = useState(new Set());
  const [expandedRestaurant, setExpandedRestaurant] = useState(null);

  const cuisines = [
    "all",
    "Indian",
    "Chinese",
    "North Indian",
    "Healthy",
    "Italian",
    "Seafood",
    "South Indian",
  ];

  useEffect(() => {
    fetchRestaurants();
  }, []);

  useEffect(() => {
    filterAndSortRestaurants();
  }, [restaurants, searchTerm, selectedCuisine, sortBy]);

  const fetchRestaurants = async () => {
    try {
      await new Promise((res) => setTimeout(res, 1500));
      const mockRestaurants = [
        {
          id: 1,
          name: "The Spice Route",
          cuisine: "Indian, Chinese",
          rating: 4.6,
          reviews: 1247,
          deliveryTime: "30-40 mins",
          distance: "2.5 km",
          priceRange: "₹₹",
          image: "/images/restaurants/spice-route.jpg",
          description:
            "Authentic Indian and Chinese fusion cuisine with a modern twist",
          featured: true,
          offer: "20% OFF up to ₹100",
          tags: ["Bestseller", "Healthy", "Trending"],
        },
        {
          id: 2,
          name: "Tandoori Tales",
          cuisine: "North Indian",
          rating: 4.4,
          reviews: 892,
          deliveryTime: "25-35 mins",
          distance: "1.8 km",
          priceRange: "₹₹₹",
          image: "/images/restaurants/tandoori-tales.jpg",
          description: "Traditional North Indian dishes cooked in clay ovens",
          featured: false,
          offer: "Free delivery",
          tags: ["Premium", "Traditional"],
        },
        {
          id: 3,
          name: "Green Bowl",
          cuisine: "Healthy, Salads",
          rating: 4.8,
          reviews: 567,
          deliveryTime: "20-30 mins",
          distance: "3.2 km",
          priceRange: "₹₹",
          image: "/images/restaurants/green-bowl.jpg",
          description: "Fresh, organic salads and healthy meal options",
          featured: true,
          offer: "30% OFF on first order",
          tags: ["Healthy", "Organic", "Vegetarian"],
        },
        {
          id: 4,
          name: "Pizza Town",
          cuisine: "Italian, Fast Food",
          rating: 4.5,
          reviews: 1563,
          deliveryTime: "30-45 mins",
          distance: "4.1 km",
          priceRange: "₹₹",
          image: "/images/restaurants/pizza-town.jpg",
          description: "Wood-fired pizzas and authentic Italian pasta",
          featured: false,
          offer: "Buy 1 Get 1 Free",
          tags: ["Fast Food", "Family"],
        },
        {
          id: 5,
          name: "Coastal Bites",
          cuisine: "Seafood, South Indian",
          rating: 4.7,
          reviews: 734,
          deliveryTime: "35-45 mins",
          distance: "5.2 km",
          priceRange: "₹₹₹₹",
          image: "/images/restaurants/coastal-bites.jpg",
          description: "Fresh seafood and traditional South Indian coastal cuisine",
          featured: true,
          offer: "15% OFF above ₹500",
          tags: ["Seafood", "Coastal", "Premium"],
        },
        {
          id: 6,
          name: "Burger Junction",
          cuisine: "American, Fast Food",
          rating: 4.3,
          reviews: 945,
          deliveryTime: "15-25 mins",
          distance: "1.5 km",
          priceRange: "₹₹",
          image: "/images/restaurants/burger-junction.jpg",
          description: "Gourmet burgers and crispy fries",
          featured: false,
          offer: "Combo deals available",
          tags: ["Fast Food", "American"],
        },
      ];
      setRestaurants(mockRestaurants);
    } catch (error) {
      console.error("Error loading restaurants:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortRestaurants = () => {
    let filtered = restaurants.filter((restaurant) => {
      const matchesSearch =
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCuisine =
        selectedCuisine === "all" ||
        restaurant.cuisine.toLowerCase().includes(selectedCuisine.toLowerCase());
      return matchesSearch && matchesCuisine;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "deliveryTime":
          return (
            parseInt(a.deliveryTime.split("-")[0]) -
            parseInt(b.deliveryTime.split("-")[0])
          );
        case "distance":
          return parseFloat(a.distance) - parseFloat(b.distance);
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredRestaurants(filtered);
  };

  const toggleFavorite = (restaurantId) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(restaurantId)) {
        newFavorites.delete(restaurantId);
      } else {
        newFavorites.add(restaurantId);
      }
      return newFavorites;
    });
  };

  const toggleExpand = (restaurantId) => {
    setExpandedRestaurant(expandedRestaurant === restaurantId ? null : restaurantId);
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return "text-green-600";
    if (rating >= 4.0) return "text-yellow-600";
    return "text-orange-600";
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <Loader className="animate-spin w-12 h-12 text-green-500 mb-4" />
        <p className="text-gray-600 text-lg">
          Discovering amazing restaurants near you...
        </p>
        <div className="mt-4 w-64 bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full animate-pulse"
            style={{ width: "60%" }}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 pt-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
            Discover Amazing <span className="text-green-600">Restaurants</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore top-rated restaurants delivering delicious meals near you 🍽️
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search restaurants or cuisines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Cuisine Filter */}
            <select
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {cuisines.map((c) => (
                <option key={c} value={c}>
                  {c === "all" ? "All Cuisines" : c}
                </option>
              ))}
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="rating">Sort by Rating</option>
              <option value="deliveryTime">Sort by Delivery Time</option>
              <option value="distance">Sort by Distance</option>
              <option value="name">Sort by Name</option>
            </select>

            {/* Results Count */}
            <div className="flex items-center justify-center bg-gray-100 rounded-lg px-4 py-2">
              <span className="text-gray-700 font-medium">
                {filteredRestaurants.length} restaurants found
              </span>
            </div>
          </div>
        </div>

        {/* Restaurants Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Restaurant Image */}
              <div className="relative">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop";
                  }}
                />

                {/* Featured */}
                {restaurant.featured && (
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </div>
                )}

                {/* Favorite */}
                <button
                  onClick={() => toggleFavorite(restaurant.id)}
                  className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:scale-110 transition-transform"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.has(restaurant.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400"
                    }`}
                  />
                </button>

                {/* Offer */}
                {restaurant.offer && (
                  <div className="absolute bottom-3 left-3 bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                    {restaurant.offer}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-xl font-bold text-gray-900 flex-1 pr-2">
                    {restaurant.name}
                  </h2>
                  <div className={`flex items-center ${getRatingColor(restaurant.rating)}`}>
                    <Star className="w-4 h-4 fill-current" />
                    <span className="ml-1 font-semibold">{restaurant.rating}</span>
                    <span className="text-gray-500 text-sm ml-1">
                      ({restaurant.reviews})
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-3">{restaurant.cuisine}</p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {restaurant.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{restaurant.deliveryTime}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{restaurant.distance}</span>
                  </div>
                  <div className="text-gray-700 font-medium">{restaurant.priceRange}</div>
                </div>

                <p className="text-gray-700 text-sm mb-4 line-clamp-2">{restaurant.description}</p>

                <div className="flex gap-3">
                  {/* FIXED: Changed from /restaurant-menu/ to /restaurant/ */}
                  <button 
                    onClick={() => navigate(`/restaurant/${restaurant.id}`)}
                    className="w-full bg-[#ff6b6b] text-white py-2 rounded-lg hover:bg-[#ff5252] transition font-semibold"
                  >
                    View Menu
                  </button>

                  <button
                    onClick={() => toggleExpand(restaurant.id)}
                    className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  >
                    {expandedRestaurant === restaurant.id ? "Less" : "More"}
                  </button>
                </div>

                {expandedRestaurant === restaurant.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200 animate-fadeIn">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Popular Dishes
                        </h4>
                        <ul className="text-gray-600 space-y-1">
                          <li>• Butter Chicken</li>
                          <li>• Biryani</li>
                          <li>• Garlic Naan</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Features</h4>
                        <ul className="text-gray-600 space-y-1">
                          <li>• Pure Veg ✅</li>
                          <li>• Free Delivery</li>
                          <li>• 24/7 Available</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredRestaurants.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No restaurants found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filters to find more options.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCuisine("all");
              }}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Restaurants;