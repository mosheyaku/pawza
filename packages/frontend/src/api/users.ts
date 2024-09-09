import { apiClient } from './base';

export interface Notification {
  id: string;
  title: string;
  content: string;
  read: boolean;
  image?: string;
  pawedBy?: string;
}

export const getUserProfile = (userId: string) => apiClient.get(`/users/${userId}/profile`);
