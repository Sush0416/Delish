import { useState, useEffect } from 'react';
import axios from 'axios';

export const useTiffin = () => {
  const [tiffinPlans, setTiffinPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  const getTiffinPlans = async ({ type, search } = {}, reset = false) => {
    try {
      setLoading(true);
      setError('');

      const currentPage = reset ? 1 : page;
      const params = { page: currentPage, limit: 6 };
      if (type) params.type = type;
      if (search) params.search = search;

      const res = await axios.get(`${API_BASE}/api/tiffins`, { params });
      const newPlans = res.data.plans;

      setTiffinPlans(prev => reset ? newPlans : [...prev, ...newPlans]);
      setPage(currentPage + 1);
      setHasMore(res.data.total > (currentPage * 6));
    } catch (err) {
      console.error(err);
      setError('Failed to fetch tiffin plans.');
    } finally {
      setLoading(false);
    }
  };

  const resetTiffinPlans = (filters) => {
    setPage(1);
    getTiffinPlans(filters, true);
  };

  return { tiffinPlans, loading, error, getTiffinPlans, resetTiffinPlans, hasMore };
};
