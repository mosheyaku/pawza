import { apiClient } from './base';

export const getMe = () => apiClient.get('/me');
