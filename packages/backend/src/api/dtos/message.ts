import { type MessageDoc } from '../../models/message.js';

export interface MessageDto {
  id: string;
  content: string;
  timestamp: Date;
  senderId: string;
}

export const toMessageDto = (message: MessageDoc): MessageDto => ({
  id: message._id.toString(),
  content: message.content,
  timestamp: message.createdAt,
  senderId: message.sender._id.toString(),
});
