import { apiService } from './api';

export const authService = {
  setToken(token) {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  },

  async login(email, password) {
    const response = await apiService.post('/auth/login', { email, password });
    return response.data;
  },

  async register(userData) {
    const response = await apiService.post('/auth/register', userData);
    return response.data;
  },

  async getCurrentUser() {
    const response = await apiService.get('/auth/profile');
    return response.data;
  },

  async updateProfile(profileData) {
    const response = await apiService.put('/auth/profile', profileData);
    return response.data;
  },

  async changePassword(passwordData) {
    const response = await apiService.put('/auth/change-password', passwordData);
    return response.data;
  },

  async forgotPassword(email) {
    const response = await apiService.post('/auth/forgot-password', { email });
    return response.data;
  },

  async resetPassword(token, password) {
    const response = await apiService.post('/auth/reset-password', { token, password });
    return response.data;
  }
};