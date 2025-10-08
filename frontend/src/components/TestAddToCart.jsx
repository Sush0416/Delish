import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';

const TestAddToCart = () => {
  const { addToCart } = useCart();

  useEffect(() => {
    const sampleItem = {
      id: 'test-item-1',
      name: 'Test Item',
      price: 9.99,
      quantity: 1,
    };
    const sampleRestaurant = {
      id: 'test-restaurant-1',
      name: 'Test Restaurant',
    };
    addToCart(sampleItem, sampleRestaurant);
  }, []);

  return null;
};

export default TestAddToCart;
