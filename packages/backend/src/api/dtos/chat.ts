import type mongoose from 'mongoose';

import { type ChatDoc } from '../../models/chat.js';

export interface ChatDto {
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

export const toChatDto = (chat: ChatDoc, userId: mongoose.Types.ObjectId): ChatDto => {
  const matchedUser = chat.users.find(user => !user._id.equals(userId))!;
  const currentUser = chat.users.find(user => user._id.equals(userId))!;

  return {
    _id: chat._id.toString(),
    user: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
    },
    matchedUser: {
      firstName: matchedUser.firstName,
      lastName: matchedUser.lastName,
    },
    latestMessage: chat.latestMessage || '',
  };
};
