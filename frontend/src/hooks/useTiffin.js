import { useState, useEffect } from 'react';
import axios from 'axios';

export const useTiffin = () => {
  const [tiffinPlans, setTiffinPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const getTiffinPlans = async ({ type, search } = {}, reset = false) => {
    try {
      setLoading(true);
      setError('');

      const currentPage = reset ? 1 : page;
      const params = { page: currentPage, limit: 6 };
      if (type) params.type = type;
      if (search) params.search = search;

      const res = await axios.get('http://localhost:5000/api/tiffins', { params });
      const newPlans = res.data.plans;

      setTiffinPlans(prev => reset ? newPlans : [...prev, ...newPlans]);
      setPage(currentPage + 1);
      setHasMore(res.data.total > ((currentPage) * 6));
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch tiffin plans.');
      setLoading(false);
    }
  };

  const resetTiffinPlans = (filters) => {
    setPage(1);
    getTiffinPlans(filters, true);
  };

  return { tiffinPlans, loading, error, getTiffinPlans, resetTiffinPlans, hasMore };
};
