// Cuisine types
export const CUISINE_TYPES = [
  'Indian',
  'Chinese',
  'Italian',
  'Mexican',
  'Thai',
  'Japanese',
  'American',
  'Mediterranean',
  'Korean',
  'Vietnamese',
  'Continental',
  'South Indian',
  'North Indian',
  'Fast Food',
  'Desserts',
  'Beverages'
];

// Meal types
export const MEAL_TYPES = [
  'breakfast',
  'lunch',
  'dinner'
];

// Order status
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  READY_FOR_DELIVERY: 'ready_for_delivery',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded'
};

// Order status labels and colors
export const ORDER_STATUS_CONFIG = {
  [ORDER_STATUS.PENDING]: {
    label: 'Pending',
    color: 'bg-yellow-100 text-yellow-800',
    progress: 10
  },
  [ORDER_STATUS.CONFIRMED]: {
    label: 'Confirmed',
    color: 'bg-blue-100 text-blue-800',
    progress: 25
  },
  [ORDER_STATUS.PREPARING]: {
    label: 'Preparing',
    color: 'bg-orange-100 text-orange-800',
    progress: 50
  },
  [ORDER_STATUS.READY_FOR_DELIVERY]: {
    label: 'Ready for Delivery',
    color: 'bg-purple-100 text-purple-800',
    progress: 75
  },
  [ORDER_STATUS.OUT_FOR_DELIVERY]: {
    label: 'Out for Delivery',
    color: 'bg-indigo-100 text-indigo-800',
    progress: 90
  },
  [ORDER_STATUS.DELIVERED]: {
    label: 'Delivered',
    color: 'bg-green-100 text-green-800',
    progress: 100
  },
  [ORDER_STATUS.CANCELLED]: {
    label: 'Cancelled',
    color: 'bg-red-100 text-red-800',
    progress: 0
  }
};

// Payment methods
export const PAYMENT_METHODS = [
  { value: 'card', label: 'Credit/Debit Card', icon: '💳' },
  { value: 'upi', label: 'UPI', icon: '📱' },
  { value: 'netbanking', label: 'Net Banking', icon: '🏦' },
  { value: 'cash', label: 'Cash on Delivery', icon: '💵' }
];

// Tiffin durations
export const TIFFIN_DURATIONS = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' }
];

// Tiffin types
export const TIFFIN_TYPES = [
  { value: 'veg', label: 'Vegetarian', color: 'bg-green-100 text-green-800' },
  { value: 'non-veg', label: 'Non-Vegetarian', color: 'bg-red-100 text-red-800' },
  { value: 'jain', label: 'Jain', color: 'bg-purple-100 text-purple-800' },
  { value: 'diet', label: 'Diet', color: 'bg-blue-100 text-blue-800' }
];

// Spice levels
export const SPICE_LEVELS = [
  { value: 'mild', label: 'Mild' },
  { value: 'medium', label: 'Medium' },
  { value: 'spicy', label: 'Spicy' }
];

// Address labels
export const ADDRESS_LABELS = [
  { value: 'home', label: 'Home', icon: '🏠' },
  { value: 'work', label: 'Work', icon: '💼' },
  { value: 'other', label: 'Other', icon: '📍' }
];

// Sort options
export const SORT_OPTIONS = [
  { value: 'rating', label: 'Rating: High to Low' },
  { value: 'delivery_time', label: 'Delivery Time' },
  { value: 'delivery_fee', label: 'Delivery Fee' },
  { value: 'newest', label: 'Newest First' }
];

// Filter options
export const FILTER_OPTIONS = {
  rating: [
    { value: 4, label: '4.0+ ⭐' },
    { value: 4.5, label: '4.5+ ⭐' },
    { value: 3, label: '3.0+ ⭐' }
  ],
  deliveryTime: [
    { value: 30, label: 'Under 30 min' },
    { value: 45, label: 'Under 45 min' },
    { value: 60, label: 'Under 60 min' }
  ]
};

// App settings
export const APP_CONFIG = {
  name: 'Delish',
  description: 'Food Delivery & Tiffin Service',
  version: '1.0.0',
  supportEmail: 'support@delish.com',
  supportPhone: '+91 9876543210',
  socialLinks: {
    facebook: 'https://facebook.com/delish',
    instagram: 'https://instagram.com/delish',
    twitter: 'https://twitter.com/delish'
  }
};

// Local storage keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  CART: 'delish-cart',
  RESTAURANT: 'delish-restaurant',
  ADDRESS: 'delish-address',
  THEME: 'delish-theme'
};

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    PROFILE: '/auth/profile',
    CHANGE_PASSWORD: '/auth/change-password'
  },
  RESTAURANTS: {
    LIST: '/restaurants',
    SEARCH: '/restaurants/search',
    DETAIL: '/restaurants',
    MENU: '/restaurants/menu',
    REVIEWS: '/restaurants/reviews'
  },
  TIFFIN: {
    PLANS: '/tiffin/plans',
    SUBSCRIBE: '/tiffin/subscribe',
    SUBSCRIPTIONS: '/tiffin/my-subscriptions'
  },
  ORDERS: {
    CREATE: '/orders',
    LIST: '/orders',
    DETAIL: '/orders',
    TRACK: '/orders/track'
  },
  USERS: {
    ADDRESSES: '/users/addresses',
    FAVORITES: '/users/favorites',
    AVATAR: '/users/avatar'
  }
};