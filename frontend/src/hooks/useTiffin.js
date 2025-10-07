import { useState, useCallback } from 'react';

export const useTiffin = () => {
  const [tiffinPlans, setTiffinPlans] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [params, setParams] = useState({});

  const getTiffinPlans = useCallback(
    async (newParams = {}) => {
      setLoading(true);
      setError(null);

      try {
        const mergedParams = { ...params, ...newParams };
        setParams(mergedParams);

        const query = new URLSearchParams({
          page,
          ...(mergedParams.type && { type: mergedParams.type }),
          ...(mergedParams.search && { search: mergedParams.search }),
        }).toString();

        const apiUrl = `/api/tiffins?${query}`;
        console.log('Fetching:', apiUrl); // <-- DEBUG: Logs URL being fetched

        const res = await fetch(apiUrl);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Fetch failed: ${res.status} ${res.statusText} — ${text}`);
        }

        const data = await res.json();

        // Check structure
        if (!data.plans) {
          throw new Error('Invalid response: "plans" array missing in API response.');
        }

        setTiffinPlans(prev => (page === 1 ? data.plans : [...prev, ...data.plans]));
        setHasMore(data.plans.length > 0);
        setPage(prev => prev + 1);
      } catch (err) {
        console.error('Error fetching tiffin plans:', err);
        setError(err.message || 'Something went wrong while fetching tiffin plans.');
      } finally {
        setLoading(false);
      }
    },
    [page, params]
  );

  const resetTiffinPlans = useCallback(
    (newParams = {}) => {
      setTiffinPlans([]);
      setPage(1);
      setHasMore(true);
      setParams(newParams);
      getTiffinPlans({ ...newParams, page: 1 });
    },
    [getTiffinPlans]
  );

  return {
    tiffinPlans,
    loading,
    error,
    hasMore,
    getTiffinPlans,
    resetTiffinPlans
  };
};
