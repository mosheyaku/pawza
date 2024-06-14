import mongoose, { type InferSchemaType } from 'mongoose';

export enum NotificationType {
  YouWereLiked = 'you-were-liked',
}

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(NotificationType),
      required: true,
    },
    pawedBy: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      firstName: {
        type: String,
        required: true,
      },
    },
    read: {
      type: Boolean,
      required: true,
      default: false,
    },
    image: String,
  },
  { timestamps: true },
);

export type NotificationDoc = InferSchemaType<typeof notificationSchema> & { _id: mongoose.Types.ObjectId };

export const NotificationModel = mongoose.model('Notification', notificationSchema);
