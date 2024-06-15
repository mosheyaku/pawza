import { apiClient } from './base';

export const uploadProfileImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  return await apiClient.post('/profile/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
