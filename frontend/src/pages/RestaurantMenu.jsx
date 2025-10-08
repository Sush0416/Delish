import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  ArrowLeft, Plus, Minus, Star, Clock, MapPin, 
  Heart, Share2, Shield, Truck, Users, Filter 
} from "lucide-react";
import { useCart } from "../context/CartContext";

// Mock restaurant data with ALL 6 RESTAURANTS
const restaurantsData = [
  {
    id: 1,
    name: "The Spice Route",
    cuisine: "Indian, Chinese Fusion",
    rating: 4.6,
    reviews: 1247,
    deliveryTime: "30-40 mins",
    distance: "2.5 km",
    priceRange: "₹₹",
    offer: "20% OFF up to ₹100",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
    description: "Authentic Indian and Chinese fusion cuisine with a modern twist",
    tags: ["Bestseller", "Healthy", "Trending"],
    safety: "Follows all safety measures",
    minOrder: 199,
    deliveryFee: 30
  },
  {
    id: 2,
    name: "Tandoori Tales",
    cuisine: "North Indian, Mughlai",
    rating: 4.4,
    reviews: 892,
    deliveryTime: "25-35 mins",
    distance: "1.8 km",
    priceRange: "₹₹₹",
    offer: "Free delivery",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=300&fit=crop",
    description: "Traditional North Indian dishes cooked in clay ovens",
    tags: ["Premium", "Traditional"],
    safety: "Contactless delivery available",
    minOrder: 299,
    deliveryFee: 0
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
    offer: "30% OFF on first order",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
    description: "Fresh, organic salads and healthy meal options",
    tags: ["Healthy", "Organic", "Vegetarian"],
    safety: "Follows all safety measures",
    minOrder: 199,
    deliveryFee: 25
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
    offer: "Buy 1 Get 1 Free",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
    description: "Wood-fired pizzas and authentic Italian pasta",
    tags: ["Fast Food", "Family"],
    safety: "Contactless delivery available",
    minOrder: 249,
    deliveryFee: 35
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
    offer: "15% OFF above ₹500",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
    description: "Fresh seafood and traditional South Indian coastal cuisine",
    tags: ["Seafood", "Coastal", "Premium"],
    safety: "Follows all safety measures",
    minOrder: 399,
    deliveryFee: 40
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
    offer: "Combo deals available",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
    description: "Gourmet burgers and crispy fries",
    tags: ["Fast Food", "American"],
    safety: "Contactless delivery available",
    minOrder: 179,
    deliveryFee: 20
  }
];

// Mock menu items for ALL RESTAURANTS
const menuItemsData = [
  // Restaurant 1 - The Spice Route
  {
    id: 1,
    name: "Paneer Butter Masala",
    desc: "Rich and creamy tomato gravy with soft paneer cubes, cooked in butter and spices.",
    price: 320,
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop",
    category: "main",
    rating: 4.8,
    reviews: 234,
    prepTime: "15-20 mins",
    isVeg: true,
    isBestseller: true,
    tags: ["Chef's Special", "Mild Spicy"],
    restaurantId: 1,
    customizations: [
      { name: "Spice Level", options: ["Mild", "Medium", "Spicy"] },
      { name: "Extra Cheese", options: ["Yes", "No"] }
    ]
  },
  {
    id: 2,
    name: "Dal Makhani",
    desc: "Creamy black lentils slow-cooked overnight with butter and cream.",
    price: 280,
    image: "https://images.unsplash.com/photo-1585938381612-c185ad521745?w=400&h=300&fit=crop",
    category: "main",
    rating: 4.6,
    reviews: 189,
    prepTime: "10-15 mins",
    isVeg: true,
    isBestseller: true,
    tags: ["Signature Dish"],
    restaurantId: 1,
    customizations: [
      { name: "Spice Level", options: ["Mild", "Medium", "Spicy"] }
    ]
  },
  {
    id: 3,
    name: "Butter Naan",
    desc: "Soft and fluffy tandoor-baked bread brushed with fresh butter.",
    price: 80,
    image: "https://images.unsplash.com/photo-1601050690597-df0568a70957?w=400&h=300&fit=crop",
    category: "breads",
    rating: 4.5,
    reviews: 456,
    prepTime: "5-10 mins",
    isVeg: true,
    tags: ["Freshly Baked"],
    restaurantId: 1
  },
  {
    id: 4,
    name: "Veg Biryani",
    desc: "Aromatic basmati rice layered with fresh vegetables, saffron, and spices.",
    price: 250,
    image: "https://images.unsplash.com/photo-1563379091339-03246963d9c6?w=400&h=300&fit=crop",
    category: "rice",
    rating: 4.7,
    reviews: 312,
    prepTime: "20-25 mins",
    isVeg: true,
    tags: ["Hyderabadi Style"],
    restaurantId: 1
  },

  // Restaurant 2 - Tandoori Tales
  {
    id: 5,
    name: "Chicken Tikka",
    desc: "Succulent chicken pieces marinated in spices and grilled to perfection.",
    price: 380,
    image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&h=300&fit=crop",
    category: "starters",
    rating: 4.9,
    reviews: 278,
    prepTime: "15-20 mins",
    isVeg: false,
    isBestseller: true,
    tags: ["Sizzling", "Spicy"],
    restaurantId: 2
  },
  {
    id: 6,
    name: "Gulab Jamun",
    desc: "Soft milk dumplings soaked in rose-flavored sugar syrup.",
    price: 120,
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=300&fit=crop",
    category: "desserts",
    rating: 4.4,
    reviews: 145,
    prepTime: "5 mins",
    isVeg: true,
    tags: ["Sweet"],
    restaurantId: 2
  },

  // Restaurant 3 - Green Bowl
  {
    id: 7,
    name: "Quinoa Salad Bowl",
    desc: "Healthy quinoa with fresh vegetables and lemon dressing.",
    price: 220,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
    category: "main",
    rating: 4.7,
    reviews: 189,
    prepTime: "10-15 mins",
    isVeg: true,
    isBestseller: true,
    tags: ["Healthy", "Protein Rich"],
    restaurantId: 3
  },
  {
    id: 8,
    name: "Avocado Toast",
    desc: "Whole grain bread with smashed avocado and cherry tomatoes.",
    price: 180,
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop",
    category: "starters",
    rating: 4.5,
    reviews: 156,
    prepTime: "5-10 mins",
    isVeg: true,
    tags: ["Healthy", "Fresh"],
    restaurantId: 3
  },

  // Restaurant 4 - Pizza Town
  {
    id: 9,
    name: "Margherita Pizza",
    desc: "Classic pizza with fresh tomato sauce and mozzarella cheese.",
    price: 299,
    image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop",
    category: "main",
    rating: 4.6,
    reviews: 423,
    prepTime: "20-25 mins",
    isVeg: true,
    isBestseller: true,
    tags: ["Classic", "Cheesy"],
    restaurantId: 4
  },
  {
    id: 10,
    name: "Pepperoni Pizza",
    desc: "Spicy pepperoni with mozzarella and tomato sauce.",
    price: 399,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop",
    category: "main",
    rating: 4.8,
    reviews: 387,
    prepTime: "20-25 mins",
    isVeg: false,
    tags: ["Spicy", "Meat Lovers"],
    restaurantId: 4
  },

  // Restaurant 5 - Coastal Bites
  {
    id: 11,
    name: "Fish Curry",
    desc: "Traditional South Indian fish curry with coconut and spices.",
    price: 450,
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop",
    category: "main",
    rating: 4.9,
    reviews: 278,
    prepTime: "25-30 mins",
    isVeg: false,
    isBestseller: true,
    tags: ["Coastal", "Spicy"],
    restaurantId: 5
  },
  {
    id: 12,
    name: "Prawn Fry",
    desc: "Crispy fried prawns with coastal spices.",
    price: 520,
    image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=300&fit=crop",
    category: "starters",
    rating: 4.7,
    reviews: 194,
    prepTime: "15-20 mins",
    isVeg: false,
    tags: ["Crispy", "Seafood"],
    restaurantId: 5
  },

  // Restaurant 6 - Burger Junction
  {
    id: 13,
    name: "Classic Cheeseburger",
    desc: "Juicy beef patty with cheese, lettuce, and special sauce.",
    price: 199,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    category: "main",
    rating: 4.5,
    reviews: 512,
    prepTime: "10-15 mins",
    isVeg: false,
    isBestseller: true,
    tags: ["Classic", "Juicy"],
    restaurantId: 6
  },
  {
    id: 14,
    name: "Veg Supreme Burger",
    desc: "Crispy veg patty with fresh vegetables and mayo.",
    price: 169,
    image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&h=300&fit=crop",
    category: "main",
    rating: 4.3,
    reviews: 287,
    prepTime: "10-15 mins",
    isVeg: true,
    tags: ["Vegetarian", "Crispy"],
    restaurantId: 6
  }
];

const RestaurantMenu = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Convert id to number for comparison
  const restaurantId = parseInt(id);
  
  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartItemsCount,
    getItemQuantity,
    getDeliveryFee,
    getTax,
    getGrandTotal,
    meetsMinimumOrder,
    getMinimumOrderAmount,
    clearCart
  } = useCart();

  const [favorite, setFavorite] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [showCustomization, setShowCustomization] = useState(null);
  const [customizations, setCustomizations] = useState({});
  const [loading, setLoading] = useState(true);

  // Simulate API call
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Find restaurant by ID (now using number)
  const restaurant = restaurantsData.find((r) => r.id === restaurantId);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff6b6b] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading menu...</p>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">🍽️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Restaurant Not Found</h2>
          <p className="text-gray-600 mb-6">The restaurant you're looking for doesn't exist. ID: {id}</p>
          <button
            onClick={() => navigate("/restaurants")}
            className="bg-[#ff6b6b] text-white px-6 py-3 rounded-lg hover:bg-[#ff5252] transition font-semibold"
          >
            Browse Restaurants
          </button>
        </div>
      </div>
    );
  }

  // Filter menu items for this restaurant (using number ID)
  const restaurantMenu = menuItemsData.filter(item => item.restaurantId === restaurantId);

  const menuCategories = [
    { id: "all", name: "All Items", count: restaurantMenu.length },
    { id: "main", name: "Main Course", count: restaurantMenu.filter(item => item.category === "main").length },
    { id: "starters", name: "Starters", count: restaurantMenu.filter(item => item.category === "starters").length },
    { id: "breads", name: "Breads", count: restaurantMenu.filter(item => item.category === "breads").length },
    { id: "rice", name: "Rice & Biryani", count: restaurantMenu.filter(item => item.category === "rice").length },
    { id: "desserts", name: "Desserts", count: restaurantMenu.filter(item => item.category === "desserts").length },
  ];

  const filteredItems = activeCategory === "all"
    ? restaurantMenu
    : restaurantMenu.filter(item => item.category === activeCategory);

  const handleAdd = (item, customData = null) => {
    addToCart(item, restaurant, customData || []);
    setShowCustomization(null);
    setCustomizations({});
  };

  const handleRemove = (itemId) => {
    removeFromCart(itemId);
  };

  const handleUpdateQuantity = (itemId, quantity) => {
    updateQuantity(itemId, quantity);
  };

  const handleCustomization = (itemId, option, value) => {
    setCustomizations(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [option]: value
      }
    }));
  };

  const totalItems = getCartItemsCount();
  const totalPrice = getCartTotal();
  const deliveryFee = getDeliveryFee();
  const tax = getTax();
  const finalTotal = getGrandTotal();
  const meetsMinOrder = meetsMinimumOrder();
  const minOrderAmount = getMinimumOrderAmount();

  const handleProceedToPayment = () => {
  if (totalItems === 0) {
    alert("Please add some items to your cart first!");
    return;
  }

  if (!meetsMinOrder) {
    alert(`Minimum order amount is ₹${minOrderAmount}. Please add more items to proceed.`);
    return;
  }

  console.log("Navigating to payment with data:", {
    restaurant,
    cartItems: Object.values(cart),
    totalPrice: finalTotal,
    deliveryFee,
    tax
  });

  navigate("/payment", {
    state: { 
      restaurant, 
      cartItems: Object.values(cart),
      totalPrice: finalTotal,
      deliveryFee,
      tax
    }
  });
};

  const shareRestaurant = async () => {
    const shareData = {
      title: restaurant.name,
      text: `Check out ${restaurant.name} on Delish!`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Restaurant link copied to clipboard!");
    }
  };

  // Check if cart has items from this restaurant
  const hasItemsFromThisRestaurant = cartItems.length > 0 && 
    cartItems[0]?.restaurant?.id === restaurantId;

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* Enhanced Header */}
      <div className="bg-white shadow-lg relative">
        <div 
          className="h-48 bg-cover bg-center"
          style={{ backgroundImage: `url(${restaurant.image})` }}
        >
          <div className="bg-black bg-opacity-40 h-full w-full">
            <div className="max-w-6xl mx-auto px-4 py-6">
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => navigate(-1)}
                  className="flex items-center text-white hover:text-gray-200 transition-colors"
                >
                  <ArrowLeft size={24} className="mr-2" />
                  <span className="font-medium">Back</span>
                </button>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setFavorite(!favorite)}
                    className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition"
                  >
                    <Heart 
                      size={20} 
                      className={favorite ? "fill-[#ff6b6b] text-[#ff6b6b]" : "text-white"} 
                    />
                  </button>
                  <button
                    onClick={shareRestaurant}
                    className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition"
                  >
                    <Share2 size={20} className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-6 -mt-16 relative z-10">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{restaurant.name}</h1>
                <p className="text-gray-600 mb-3">{restaurant.cuisine}</p>
                <p className="text-gray-700 mb-4">{restaurant.description}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center bg-green-50 text-green-700 px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 fill-current mr-1" />
                    <span className="font-semibold">{restaurant.rating}</span>
                    <span className="ml-1">({restaurant.reviews}+)</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{restaurant.deliveryTime}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{restaurant.distance}</span>
                  </div>
                  <div className="text-gray-700 font-medium">
                    {restaurant.priceRange}
                  </div>
                </div>

                {/* Restaurant Tags */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {restaurant.tags?.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Offer Card */}
              {restaurant.offer && (
                <div className="mt-4 lg:mt-0 lg:ml-6">
                  <div className="bg-gradient-to-r from-[#ff6b6b] to-[#ff8e8e] text-white p-4 rounded-xl text-center min-w-48">
                    <p className="font-bold text-lg">{restaurant.offer}</p>
                    <p className="text-sm opacity-90 mt-1">Use code: DELISH20</p>
                  </div>
                </div>
              )}
            </div>

            {/* Additional Info */}
            <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-gray-200 text-sm text-gray-600">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-green-500" />
                <span>{restaurant.safety}</span>
              </div>
              <div className="flex items-center">
                <Truck className="w-4 h-4 mr-2 text-blue-500" />
                <span>Delivery: ₹{restaurant.deliveryFee}</span>
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2 text-purple-500" />
                <span>Min. order: ₹{restaurant.minOrder}</span>
              </div>
            </div>

            {/* Cart Warning - Different Restaurant */}
            {cartItems.length > 0 && !hasItemsFromThisRestaurant && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 text-sm">
                  ⚠️ Your cart contains items from another restaurant. Adding items from here will clear your current cart.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Categories Navigation */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto py-4 scrollbar-hide">
            {menuCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  activeCategory === category.id
                    ? "bg-[#ff6b6b] text-white shadow-lg shadow-[#ff6b6b]/25"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.name}
                <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                  activeCategory === category.id 
                    ? "bg-white text-[#ff6b6b]" 
                    : "bg-gray-300 text-gray-600"
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No items in this category</h3>
            <p className="text-gray-600 mb-6">Try selecting a different category or check back later for new additions.</p>
            <button
              onClick={() => setActiveCategory("all")}
              className="bg-[#ff6b6b] text-white px-6 py-3 rounded-lg hover:bg-[#ff5252] transition font-semibold"
            >
              View All Items
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden group"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop";
                    }}
                  />
                  
                  {/* Item Badges */}
                  <div className="absolute top-3 left-3 flex flex-col space-y-1">
                    {item.isBestseller && (
                      <span className="bg-[#ff6b6b] text-white px-2 py-1 rounded text-xs font-semibold">
                        🔥 Bestseller
                      </span>
                    )}
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      item.isVeg ? "bg-green-500 text-white" : "bg-red-500 text-white"
                    }`}>
                      {item.isVeg ? "🟢 VEG" : "🔴 NON-VEG"}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs flex items-center">
                    <Star className="w-3 h-3 fill-white mr-1" />
                    {item.rating}
                  </div>

                  {/* Cart Quantity Badge */}
                  {getItemQuantity(item.id) > 0 && (
                    <div className="absolute bottom-3 right-3 bg-[#ff6b6b] text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">
                      {getItemQuantity(item.id)}
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 flex-1 pr-2">
                      {item.name}
                    </h3>
                    <span className="text-lg font-bold text-gray-900">₹{item.price}</span>
                  </div>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {item.desc}
                  </p>

                  {/* Tags */}
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Item Details */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{item.prepTime}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-3 h-3 mr-1" />
                      <span>{item.reviews} reviews</span>
                    </div>
                  </div>

                  {/* Add to Cart */}
                  <div className="flex items-center justify-between">
                    {getItemQuantity(item.id) > 0 ? (
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, getItemQuantity(item.id) - 1)}
                          className="bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="font-semibold text-gray-900 min-w-8 text-center">
                          {getItemQuantity(item.id)}
                        </span>
                        <button
                          onClick={() => {
                            if (item.customizations) {
                              setShowCustomization(item.id);
                            } else {
                              handleAdd(item);
                            }
                          }}
                          className="bg-[#ff6b6b] text-white p-2 rounded-full hover:bg-[#ff5252] transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          if (item.customizations) {
                            setShowCustomization(item.id);
                          } else {
                            handleAdd(item);
                          }
                        }}
                        className="bg-[#ff6b6b] text-white px-4 py-2 rounded-lg hover:bg-[#ff5252] transition-colors font-semibold flex-1"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Customization Modal */}
      {showCustomization && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Customize Your Order</h3>
                <button
                  onClick={() => {
                    setShowCustomization(null);
                    setCustomizations({});
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              {menuItemsData.find(item => item.id === showCustomization)?.customizations?.map((custom, index) => (
                <div key={index} className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {custom.name}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {custom.options.map((option, optIndex) => (
                      <button
                        key={optIndex}
                        onClick={() => handleCustomization(showCustomization, custom.name, option)}
                        className={`px-3 py-2 rounded-lg text-sm border transition-colors ${
                          customizations[showCustomization]?.[custom.name] === option
                            ? "bg-[#ff6b6b] text-white border-[#ff6b6b]"
                            : "bg-white text-gray-700 border-gray-300 hover:border-[#ff6b6b]"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowCustomization(null);
                    setCustomizations({});
                  }}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleAdd(
                    menuItemsData.find(item => item.id === showCustomization),
                    customizations[showCustomization]
                  )}
                  className="flex-1 bg-[#ff6b6b] text-white px-4 py-3 rounded-lg hover:bg-[#ff5252] transition-colors font-semibold"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Sticky Footer Cart */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-white shadow-2xl border-t border-gray-200 z-30">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <div className="bg-[#ff6b6b] text-white rounded-full w-10 h-10 flex items-center justify-center font-semibold text-lg">
                  {totalItems}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 text-lg">
                    ₹{finalTotal.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {totalItems} item{totalItems !== 1 ? 's' : ''} • ₹{totalPrice} + ₹{deliveryFee} delivery + ₹{tax.toFixed(2)} tax
                  </p>
                  {!meetsMinOrder && (
                    <p className="text-sm text-red-600 font-medium mt-1">
                      Add ₹{(minOrderAmount - totalPrice).toFixed(2)} more to place order
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={clearCart}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                >
                  Clear All
                </button>
                <button
                  onClick={handleProceedToPayment}
                  disabled={!meetsMinOrder}
                  className={`px-8 py-3 rounded-lg transition-colors font-semibold shadow-lg flex items-center ${
                    meetsMinOrder
                      ? "bg-[#ff6b6b] text-white hover:bg-[#ff5252] shadow-[#ff6b6b]/25"
                      : "bg-gray-400 text-gray-200 cursor-not-allowed"
                  }`}
                >
                  Checkout 
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantMenu;