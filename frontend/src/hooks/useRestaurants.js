import { useState, useEffect } from 'react';
import axios from 'axios';

export const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getRestaurants = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await axios.get('http://localhost:5000/api/restaurants');
      setRestaurants(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch restaurants.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  return { restaurants, loading, error };
};
