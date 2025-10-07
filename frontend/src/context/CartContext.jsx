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

  // Clear cart when component mounts (for development)
  useEffect(() => {
    // Uncomment the line below to clear cart on page refresh during development
    // setCartItems([]);
  }, []);

  const addToCart = (item, restaurant) => {
    setCartItems(prevItems => {
      // If adding from a different restaurant, clear the cart
      if (restaurantId && restaurantId !== restaurant.id) {
        setRestaurantId(restaurant.id);
        return [{ ...item, restaurant }];
      }

      setRestaurantId(restaurant.id);
      
      const existingItem = prevItems.find(i => 
        i.id === item.id && 
        JSON.stringify(i.modifiers) === JSON.stringify(item.modifiers)
      );

      if (existingItem) {
        return prevItems.map(i =>
          i.id === item.id && 
          JSON.stringify(i.modifiers) === JSON.stringify(item.modifiers)
            ? { ...i, quantity: i.quantity + (item.quantity || 1) }
            : i
        );
      }
      
      return [...prevItems, { 
        ...item, 
        quantity: item.quantity || 1,
        restaurant 
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
    const minOrder = restaurant.deliveryInfo?.minOrder || 0;
    
    if (subtotal < minOrder) {
      return 0; // Will show warning about minimum order
    }

    return restaurant.deliveryInfo?.deliveryFee || 0;
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
    if (cartItems.length === 0) return true;
    
    const restaurant = cartItems[0]?.restaurant;
    if (!restaurant) return true;

    const subtotal = getCartTotal();
    const minOrder = restaurant.deliveryInfo?.minOrder || 0;
    
    return subtotal >= minOrder;
  };

  const getMinimumOrderAmount = () => {
    if (cartItems.length === 0) return 0;
    
    const restaurant = cartItems[0]?.restaurant;
    return restaurant?.deliveryInfo?.minOrder || 0;
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
    getMinimumOrderAmount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};