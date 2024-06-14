import type mongoose from 'mongoose';
import { type FilterQuery } from 'mongoose';

import { type NotificationDoc, NotificationModel, NotificationType } from '../models/notification.js';
import { UserModel } from '../models/user.js';

export const getUnreadNotificationsCount = async (userId: mongoose.Types.ObjectId): Promise<number> => {
  const res = await NotificationModel.aggregate([
    { $match: { user: userId, read: false } satisfies FilterQuery<NotificationDoc> },
    { $count: 'count' },
  ]);

  return res[0]?.count || 0;
};

export const getNotifications = async (userId: mongoose.Types.ObjectId) =>
  await NotificationModel.find({ user: userId }).sort({ read: -1 }).limit(50);

export const markNotificationAsRead = async (id: mongoose.Types.ObjectId) =>
  await NotificationModel.updateOne({ _id: id }, { $set: { read: true } });

export const createYouWereLikedNotification = async (
  userId: mongoose.Types.ObjectId,
  pawedBy: mongoose.Types.ObjectId,
) => {
  const pawedByUser = await UserModel.findById(pawedBy);

  const notification = new NotificationModel({
    user: userId,
    type: NotificationType.YouWereLiked,
    pawedBy: {
      _id: pawedBy,
      firstName: pawedByUser!.firstName,
    },
    image: pawedByUser!.photos[0],
  });

  return await notification.save();
};
