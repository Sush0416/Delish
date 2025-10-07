import React, { createContext, useState, useContext } from 'react';
import { toast } from 'react-hot-toast';

const AppContext = createContext();

export { AppContext };

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    cuisine: '',
    minRating: 0,
    maxDeliveryTime: 60,
    sortBy: 'rating'
  });
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);

  const showToast = (message, type = 'success', options = {}) => {
    const toastOptions = {
      duration: 4000,
      position: 'top-right',
      style: {
        background: type === 'success' ? '#10b981' : 
                   type === 'error' ? '#ef4444' : 
                   type === 'warning' ? '#f59e0b' : '#3b82f6',
        color: 'white',
        fontWeight: '500',
        borderRadius: '8px',
        padding: '12px 16px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
      },
      ...options
    };

    switch (type) {
      case 'success':
        toast.success(message, toastOptions);
        break;
      case 'error':
        toast.error(message, toastOptions);
        break;
      case 'warning':
        toast(message, { 
          ...toastOptions,
          icon: '⚠️'
        });
        break;
      default:
        toast(message, toastOptions);
    }
  };

  const showLoading = (message = 'Loading...') => {
    setLoading(true);
    return toast.loading(message);
  };

  const hideLoading = (toastId, message = null, type = 'success') => {
    setLoading(false);
    if (message) {
      toast.dismiss(toastId);
      showToast(message, type);
    } else {
      toast.dismiss(toastId);
    }
  };

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      cuisine: '',
      minRating: 0,
      maxDeliveryTime: 60,
      sortBy: 'rating'
    });
  };

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser.'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          };
          setLocation(location);
          resolve(location);
        },
        (error) => {
          let message = 'Unable to retrieve your location.';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              message = 'Location access denied. Please enable location services.';
              break;
            case error.POSITION_UNAVAILABLE:
              message = 'Location information is unavailable.';
              break;
            case error.TIMEOUT:
              message = 'Location request timed out.';
              break;
            default:
              message = 'An unknown error occurred.';
          }
          reject(new Error(message));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    });
  };

  const value = {
    // State
    loading,
    searchQuery,
    filters,
    location,
    address,

    // Actions
    setLoading,
    setSearchQuery,
    updateFilters,
    clearFilters,
    setLocation,
    setAddress,

    // Utilities
    showToast,
    showLoading,
    hideLoading,
    getCurrentLocation
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};