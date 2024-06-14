import mongoose, { type InferSchemaType } from 'mongoose';

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat',
    required: true,
  },
}, { timestamps: true });

export type MessageDoc = InferSchemaType<typeof messageSchema> & { _id: mongoose.Types.ObjectId };

export const MessageModel = mongoose.model<MessageDoc>('Message', messageSchema);
