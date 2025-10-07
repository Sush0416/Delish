import { apiService } from './api';

export const restaurantService = {
  async getRestaurants(filters = {}) {
    const params = new URLSearchParams();
    
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
        params.append(key, filters[key]);
      }
    });

    const response = await apiService.get(`/restaurants?${params}`);
    return response.data;
  },

  async searchRestaurants(query, location = null) {
    const params = new URLSearchParams({ q: query });
    
    if (location) {
      params.append('latitude', location.latitude);
      params.append('longitude', location.longitude);
    }

    const response = await apiService.get(`/restaurants/search?${params}`);
    return response.data;
  },

  async getRestaurant(restaurantId) {
    const response = await apiService.get(`/restaurants/${restaurantId}`);
    return response.data;
  },

  async getMenu(restaurantId) {
    const response = await apiService.get(`/restaurants/${restaurantId}/menu`);
    return response.data;
  },

  async createRestaurant(restaurantData) {
    const response = await apiService.post('/restaurants', restaurantData);
    return response.data;
  },

  async updateRestaurant(restaurantId, restaurantData) {
    const response = await apiService.put(`/restaurants/${restaurantId}`, restaurantData);
    return response.data;
  },

  async addReview(restaurantId, reviewData) {
    const response = await apiService.post(`/restaurants/${restaurantId}/reviews`, reviewData);
    return response.data;
  }
};