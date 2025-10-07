import { apiService } from './api';

export const userService = {
  async getAddresses() {
    const response = await apiService.get('/users/addresses');
    return response.data;
  },

  async addAddress(addressData) {
    const response = await apiService.post('/users/addresses', addressData);
    return response.data;
  },

  async updateAddress(addressId, addressData) {
    const response = await apiService.put(`/users/addresses/${addressId}`, addressData);
    return response.data;
  },

  async deleteAddress(addressId) {
    const response = await apiService.delete(`/users/addresses/${addressId}`);
    return response.data;
  },

  async setDefaultAddress(addressId) {
    const response = await apiService.put(`/users/addresses/${addressId}/default`);
    return response.data;
  },

  async getFavorites() {
    const response = await apiService.get('/users/favorites');
    return response.data;
  },

  async addToFavorites(restaurantId) {
    const response = await apiService.post('/users/favorites', { restaurantId });
    return response.data;
  },

  async removeFromFavorites(restaurantId) {
    const response = await apiService.delete(`/users/favorites/${restaurantId}`);
    return response.data;
  },

  async uploadAvatar(formData) {
    const response = await apiService.post('/users/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }
};