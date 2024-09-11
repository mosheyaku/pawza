import type mongoose from 'mongoose';

import { AppForbiddenError } from '../errors/app-forbidden.js';
import { ChatModel, type PopulatedChatDoc } from '../models/chat.js';
import { MessageModel } from '../models/message.js';

export const getChatById = async (chatId: mongoose.Types.ObjectId): Promise<PopulatedChatDoc | null> =>
  await ChatModel.findById(chatId).populate<Pick<PopulatedChatDoc, 'users'>>('users', 'firstName lastName photos');

// Function to get all matched chats for a user
export const getMatchedChats = async (userId: mongoose.Types.ObjectId): Promise<PopulatedChatDoc[]> => {
  const chats = await ChatModel.find({
    users: userId,
  }).populate<Pick<PopulatedChatDoc, 'users'>>('users', 'firstName lastName photos');

  return chats;
};

// Function to create a new chat
export const createChat = async (
  userId1: mongoose.Types.ObjectId,
  userId2: mongoose.Types.ObjectId,
  superLikedBy?: mongoose.Types.ObjectId,
) => {
  const chat = await ChatModel.findOne({
    users: {
      $all: [userId1, userId2],
    },
  });

  // If the chat already exists, it might be because of a super like
  // In that case we should update that it is no longer one sided
  if (chat) {
    if (chat.isOneSided) {
      chat.isOneSided = false;
      await chat.save();
    }

    return;
  }

  // When a SUPER LIKE chat is created, it means that the chat is one sided
  const newChat = new ChatModel({ users: [userId1, userId2], superLikedBy, isOneSided: !!superLikedBy });
  return await newChat.save();
};

// Function to create a new message
export const createMessage = async (
  content: string,
  chatId: mongoose.Types.ObjectId,
  senderId: mongoose.Types.ObjectId,
) => {
  const chat = await ChatModel.findById(chatId).orFail();
  if (chat.isOneSided && chat.superLikedBy?.equals(senderId) && chat.latestMessage) {
    throw new AppForbiddenError('Cannot send second more than one message to super-liked chat');
  }

  const newMessage = new MessageModel({
    content,
    sender: senderId,
    chatId,
  });

  await newMessage.save();
  await ChatModel.updateOne({ _id: chatId }, { latestMessage: content });

  return newMessage;
};

// Function to get all messages for a chat
export const getMessagesForChat = async (chatId: mongoose.Types.ObjectId) => {
  const messages = await MessageModel.find({ chatId }).sort({ createdAt: 1 }).populate('sender', 'firstName lastName');

  return messages;
};
