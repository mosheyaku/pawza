import { apiClient } from './base';

// TODO: Response interface

export const signUp = (data: { email: string; password: string }) => apiClient.post('/auth/sign-up', data);
