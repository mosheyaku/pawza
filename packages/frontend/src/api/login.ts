import { apiClient } from './base';

export const login = (data: { email: string; password: string }) => apiClient.post('/auth/login', data);
