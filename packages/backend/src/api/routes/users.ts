import { Router } from 'express';
import { isValidObjectId } from 'mongoose';

import { AppBadRequestError } from '../../errors/app-bad-request.js';
import { UserModel } from '../../models/user.js';
import { toProfileDto } from '../dtos/profile.js';
import { toUserDto } from '../dtos/user.js';

const usersRouter = Router();

usersRouter.get('/', async (req, res) => {
  const users = await UserModel.find();
  res.json(users.map((user) => toUserDto(user)));
});

usersRouter.get('/:id/profile', async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    throw new AppBadRequestError('Bad user id');
  }

  const user = await UserModel.findById(req.params.id).orFail();
  res.json(toProfileDto(user));
});

export { usersRouter };
