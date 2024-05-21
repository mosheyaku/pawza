import { Router } from 'express';

import { auth } from '../middlewares/auth.js';
import { authRouter } from './auth.js';
import { potentialMatcherRouter } from './potential-matches.js';
import { usersRouter } from './users.js';

const indexRouter = Router();

indexRouter.use('/auth', authRouter);
indexRouter.use('/users', auth(), usersRouter);
indexRouter.use('/potential-matches', auth(), potentialMatcherRouter);

export { indexRouter };
