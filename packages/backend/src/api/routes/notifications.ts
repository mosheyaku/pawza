import { Router } from 'express';
import mongoose, { isValidObjectId } from 'mongoose';

import { getNotifications, getUnreadNotificationsCount, markNotificationAsRead } from '../../bll/notifications.js';
import { AppBadRequestError } from '../../errors/app-bad-request.js';
import { toNotificationDto } from '../dtos/notifications.js';

const notificationsRouter = Router();

notificationsRouter.get('/unread-count', async (req, res) => {
  const unreadCount = await getUnreadNotificationsCount(req.user.id);
  res.json(unreadCount);
});

notificationsRouter.get('/', async (req, res) => {
  const notifications = await getNotifications(req.user.id);
  res.json(notifications.map((notification) => toNotificationDto(notification)));
});

notificationsRouter.put('/:id/mark-as-read', async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    throw new AppBadRequestError('Invalid notification ID');
  }

  await markNotificationAsRead(new mongoose.Types.ObjectId(req.params.id));
  res.send();
});

export { notificationsRouter };
