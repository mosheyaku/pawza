import { apiClient } from './base';

// Define the response interface for messages
export interface Message {
  id: string;
  content: string;
  timestamp: Date;
  senderId: string;
  senderName: string;
}

// Define the response interface for chats
export interface Chat {
  _id: string;
  user: {
    firstName: string;
    lastName: string;
  };
  matchedUser: {
    firstName: string;
    lastName: string;
  };
  latestMessage: string;
}

// Fetch chats
export const fetchChats = () => 
  apiClient.get<Chat[]>('/chats').then(response => response.data);

// Fetch messages for a specific chat
export const fetchMessages = (chatId: string) => 
  apiClient.get<Message[]>(`/chats/${chatId}/messages`).then(response => response.data);

// Send a new message
export const sendMessage = (chatId: string, content: string) => 
  apiClient.post<Message>(`/chats/${chatId}/messages`, { content }).then(response => response.data);

// Fetch current chat information
export const fetchChat = (chatId: string) => 
  apiClient.get<Chat>(`/chats/${chatId}`).then(response => response.data);
