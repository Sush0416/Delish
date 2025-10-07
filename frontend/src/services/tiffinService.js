
import { apiService } from './apiService';


export const tiffinService = {
  getPlans: async (filters = {}) => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) params.append(key, filters[key]);
    });
    const response = await apiService.get(`/tiffin/plans?${params}`);
    return response;
  },

  getPlan: async (planId) => {
    const response = await apiService.get(`/tiffin/plans/${planId}`);
    return response;
  },

  subscribe: async (subscriptionData) => {
    const response = await apiService.post('/tiffin/subscribe', subscriptionData);
    return response;
  },

  getUserSubscriptions: async () => {
    const response = await apiService.get('/tiffin/my-subscriptions');
    return response;
  },
};
