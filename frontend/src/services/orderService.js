import { apiService } from './api';

export const orderService = {
  async createOrder(orderData) {
    const response = await apiService.post('/orders', orderData);
    return response.data;
  },

  async getOrders(filters = {}) {
    const params = new URLSearchParams();
    
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
        params.append(key, filters[key]);
      }
    });

    const response = await apiService.get(`/orders?${params}`);
    return response.data;
  },

  async getOrder(orderId) {
    const response = await apiService.get(`/orders/${orderId}`);
    return response.data;
  },

  async trackOrder(orderId) {
    const response = await apiService.get(`/orders/${orderId}/track`);
    return response.data;
  },

  async updateOrderStatus(orderId, status) {
    const response = await apiService.put(`/orders/${orderId}/status`, { status });
    return response.data;
  },

  async cancelOrder(orderId) {
    const response = await apiService.put(`/orders/${orderId}/cancel`);
    return response.data;
  }
};