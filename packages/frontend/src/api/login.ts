import { apiClient } from './base';

// TODO: Response interface

export const login = (data: { email: string; password: string }) => apiClient.post('/auth/login', data);
