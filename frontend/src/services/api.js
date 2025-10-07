import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Add auth token if exists
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Global response handling
api.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response) {
      const { status, data } = error.response;
      const message = data?.message || data?.error || error.message;
      if (status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      return Promise.reject({ message, status, data: data?.data });
    } else if (error.request) {
      return Promise.reject({ message: 'Network error', status: 0 });
    } else {
      return Promise.reject({ message: error.message });
    }
  }
);

export const apiService = {
  get: (url, config = {}) => api.get(url, config),
  post: (url, data = {}, config = {}) => api.post(url, data, config),
  put: (url, data = {}, config = {}) => api.put(url, data, config),
  patch: (url, data = {}, config = {}) => api.patch(url, data, config),
  delete: (url, config = {}) => api.delete(url, config),
};

export default api;
