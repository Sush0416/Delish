// src/services/apiService.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export const apiService = {
  get: (url, config = {}) => api.get(url, config).then(res => res.data),
  post: (url, data = {}, config = {}) => api.post(url, data, config).then(res => res.data),
  put: (url, data = {}, config = {}) => api.put(url, data, config).then(res => res.data),
  patch: (url, data = {}, config = {}) => api.patch(url, data, config).then(res => res.data),
  delete: (url, config = {}) => api.delete(url, config).then(res => res.data),
};

export default api;
