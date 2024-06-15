import mongoose, { type InferSchemaType } from 'mongoose';

import { type UserDoc } from './user.js';

const chatSchema = new mongoose.Schema({
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  latestMessage: {
    type: String,
  },
});

export type ChatDoc = InferSchemaType<typeof chatSchema> & { _id: mongoose.Types.ObjectId };

export type PopulatedChatDoc = Omit<ChatDoc, 'users'> & {
  users: Array<Pick<UserDoc, 'firstName' | 'lastName' | '_id'>>;
};

export const ChatModel = mongoose.model('Chat', chatSchema);
