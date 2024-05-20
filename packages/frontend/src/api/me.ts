import { apiClient } from './base';

export const getMe = () => apiClient.get('/auth/me');
