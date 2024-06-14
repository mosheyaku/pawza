import { Router } from 'express';
import mongoose, { isObjectIdOrHexString } from 'mongoose';

import { createMessage, getChatById,getMatchedChats, getMessagesForChat } from '../../bll/chats.js';
import { AppBadRequestError } from '../../errors/app-bad-request.js';
import { toChatDto } from '../dtos/chat.js';
import { toMessageDto } from '../dtos/message.js';
import { auth } from '../middlewares/auth.js';

const chatsRouter = Router();

chatsRouter.get('/', auth(), async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.user.id);
  const chats = await getMatchedChats(userId);

  const chatDtos = chats.map(chat => toChatDto(chat, userId));
  res.json(chatDtos);
});

chatsRouter.get('/:chatId', auth(), async (req, res) => {
  const { chatId } = req.params;

  if (!isObjectIdOrHexString(chatId)) {
    throw new AppBadRequestError();
  }

  const chat = await getChatById(new mongoose.Types.ObjectId(chatId));
  if (!chat) {
    return res.status(404).json({ message: 'Chat not found' });
  }

  const chatDto = toChatDto(chat, new mongoose.Types.ObjectId(req.user.id));
  res.json(chatDto);
});

chatsRouter.post('/:chatId/messages', auth(), async (req, res) => {
  const { content } = req.body;
  const { chatId } = req.params;
  const senderId = req.user.id;

  if (!isObjectIdOrHexString(chatId)) {
    throw new AppBadRequestError();
  }

  const newMessage = await createMessage(content, new mongoose.Types.ObjectId(chatId), new mongoose.Types.ObjectId(senderId));
  const messageDto = toMessageDto(newMessage);
  res.status(201).json(messageDto);
});

chatsRouter.get('/:chatId/messages', auth(), async (req, res) => {
  const { chatId } = req.params;

  if (!isObjectIdOrHexString(chatId)) {
    throw new AppBadRequestError();
  }

  const messages = await getMessagesForChat(new mongoose.Types.ObjectId(chatId));
  const messageDtos = messages.map(toMessageDto);
  res.status(200).json(messageDtos);
});

export { chatsRouter };
