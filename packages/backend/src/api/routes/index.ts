import { Router } from 'express';

import { auth } from '../middlewares/auth.js';
import { authRouter } from './auth.js';
import { chatsRouter } from './chats.js';
import { notificationsRouter } from './notifications.js';
import { potentialMatcherRouter } from './potential-matches.js';
import { usersRouter } from './users.js';

const indexRouter = Router();

indexRouter.use('/auth', authRouter);
indexRouter.use('/users', auth(), usersRouter);
indexRouter.use('/notifications', auth(), notificationsRouter);
indexRouter.use('/potential-matches', auth(), potentialMatcherRouter);
indexRouter.use('/chats', auth(), chatsRouter);

export { indexRouter };
