import { apiClient } from './base';

export enum NotificationType {
  YouWereLiked = 'you-were-liked',
}

export interface Notification {
  id: string;
  title: string;
  content: string;
  read: boolean;
  image?: string;
  likedBy?: {
    id: string;
    firstName: string;
  };
}

export const getUnreadNotificationsCount = () => apiClient.get<number>('/notifications/unread-count');

export const getNotifications = () => apiClient.get<Notification[]>('/notifications').then((res) => res.data);

export const markNotificationAsRead = (id: string) => apiClient.put(`/notifications/${id}/mark-as-read`);
