import React, { createContext, useState, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const CartContext = createContext();

export { CartContext };

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage('delish-cart', []);
  const [restaurantId, setRestaurantId] = useLocalStorage('delish-restaurant', null);

  // Clear cart when restaurant changes (for development)
  useEffect(() => {
    // If you want to clear cart when switching restaurants, uncomment:
    // if (restaurantId && cartItems.length > 0 && cartItems[0].restaurant?.id !== restaurantId) {
    //   setCartItems([]);
    // }
  }, [restaurantId, cartItems, setCartItems]);

  const addToCart = (item, restaurant, modifiers = []) => {
    setCartItems(prevItems => {
      // If adding from a different restaurant, clear the cart
      if (restaurantId && restaurantId !== restaurant.id) {
        setRestaurantId(restaurant.id);
        return [{ 
          ...item, 
          restaurant,
          modifiers,
          quantity: item.quantity || 1 
        }];
      }

      // Set restaurant ID if not set
      if (!restaurantId) {
        setRestaurantId(restaurant.id);
      }
      
      // Check if item already exists with same modifiers
      const existingItemIndex = prevItems.findIndex(i => 
        i.id === item.id && 
        JSON.stringify(i.modifiers) === JSON.stringify(modifiers)
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + (item.quantity || 1)
        };
        return updatedItems;
      }
      
      // Add new item
      return [...prevItems, { 
        ...item, 
        quantity: item.quantity || 1,
        restaurant,
        modifiers
      }];
    });
  };

  const removeFromCart = (itemId, modifiers = []) => {
    setCartItems(prevItems => 
      prevItems.filter(item => 
        !(item.id === itemId && 
          JSON.stringify(item.modifiers) === JSON.stringify(modifiers))
      )
    );

    // Clear restaurant ID if cart becomes empty
    if (cartItems.length === 1) {
      setRestaurantId(null);
    }
  };

  const updateQuantity = (itemId, quantity, modifiers = []) => {
    if (quantity <= 0) {
      removeFromCart(itemId, modifiers);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId && 
        JSON.stringify(item.modifiers) === JSON.stringify(modifiers)
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setRestaurantId(null);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = item.discountedPrice || item.price;
      return total + (itemPrice * item.quantity);
    }, 0);
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getItemQuantity = (itemId, modifiers = []) => {
    const item = cartItems.find(item => 
      item.id === itemId && 
      JSON.stringify(item.modifiers) === JSON.stringify(modifiers)
    );
    return item ? item.quantity : 0;
  };

  const getDeliveryFee = () => {
    if (cartItems.length === 0) return 0;
    
    const restaurant = cartItems[0]?.restaurant;
    if (!restaurant) return 0;

    const subtotal = getCartTotal();
    const minOrder = restaurant.minOrder || restaurant.deliveryInfo?.minOrder || 0;
    
    // Return delivery fee only if minimum order is met
    if (subtotal < minOrder) {
      return restaurant.deliveryInfo?.deliveryFee || restaurant.deliveryFee || 0;
    }

    return restaurant.deliveryInfo?.deliveryFee || restaurant.deliveryFee || 0;
  };

  const getTax = () => {
    const subtotal = getCartTotal();
    return subtotal * 0.05; // 5% GST
  };

  const getGrandTotal = () => {
    const subtotal = getCartTotal();
    const deliveryFee = getDeliveryFee();
    const tax = getTax();
    return subtotal + deliveryFee + tax;
  };

  const meetsMinimumOrder = () => {
    if (cartItems.length === 0) return false;
    
    const restaurant = cartItems[0]?.restaurant;
    if (!restaurant) return false;

    const subtotal = getCartTotal();
    const minOrder = restaurant.minOrder || restaurant.deliveryInfo?.minOrder || 0;
    
    return subtotal >= minOrder;
  };

  const getMinimumOrderAmount = () => {
    if (cartItems.length === 0) return 0;
    
    const restaurant = cartItems[0]?.restaurant;
    return restaurant?.minOrder || restaurant?.deliveryInfo?.minOrder || 0;
  };

  // Get current restaurant from cart
  const getCurrentRestaurant = () => {
    if (cartItems.length === 0) return null;
    return cartItems[0]?.restaurant;
  };

  const value = {
    cartItems,
    restaurantId,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    getItemQuantity,
    getDeliveryFee,
    getTax,
    getGrandTotal,
    meetsMinimumOrder,
    getMinimumOrderAmount,
    getCurrentRestaurant
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};