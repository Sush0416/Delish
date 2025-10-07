import { apiService } from './api';

export const uploadService = {
  async uploadImages(files) {
    const formData = new FormData();
    
    files.forEach(file => {
      formData.append('images', file);
    });

    const response = await apiService.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  async uploadAvatar(file) {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await apiService.post('/users/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }
};