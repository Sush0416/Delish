import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Grid, List, ChevronDown, Loader } from 'lucide-react';
import TiffinPlanCard from '../components/TiffinPlanCard';
import { useTiffin } from '../hooks/useTiffin';

const TiffinServices = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const { tiffinPlans, loading, error, getTiffinPlans, resetTiffinPlans, hasMore } = useTiffin();

  const filters = [
    { id: 'all', name: 'All Plans' },
    { id: 'veg', name: 'Vegetarian' },
    { id: 'non-veg', name: 'Non-Vegetarian' },
    { id: 'jain', name: 'Jain' },
    { id: 'diet', name: 'Diet' },
    { id: 'weekly', name: 'Weekly' },
    { id: 'monthly', name: 'Monthly' },
    { id: 'daily', name: 'Daily' }
  ];

  useEffect(() => {
    resetTiffinPlans({
      type: selectedFilter !== 'all' ? selectedFilter : undefined,
      search: searchTerm || undefined
    });
  }, [selectedFilter, searchTerm]);

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header, Search, Filters ... same as previous code */}

        {/* Plans Grid */}
        {error ? (
          <motion.div className="text-center py-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-red-500 text-lg">{error}</p>
          </motion.div>
        ) : tiffinPlans.length === 0 ? (
          <motion.div className="text-center py-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-gray-500 text-lg">No tiffin plans found.</p>
          </motion.div>
        ) : (
          <motion.div
            className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}
            layout
          >
            <AnimatePresence>
              {tiffinPlans.map((plan, index) => (
                <motion.div
                  key={plan._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <TiffinPlanCard plan={{ ...plan, image: plan.image || '/placeholder-food.png' }} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Load More */}
        {tiffinPlans.length > 0 && hasMore && (
          <motion.div className="text-center mt-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.8 }}>
            <motion.button
              className="bg-white border-2 border-orange-500 text-orange-500 px-8 py-3 rounded-full font-semibold hover:bg-orange-500 hover:text-white transition-all shadow-lg flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => getTiffinPlans({
                type: selectedFilter !== 'all' ? selectedFilter : undefined,
                search: searchTerm || undefined
              })}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Loading...
                </>
              ) : (
                'Load More Plans'
              )}
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TiffinServices;
