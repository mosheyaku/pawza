import { Router } from 'express';

import { UserModel } from '../../models/user.js';
import { toUserDto } from '../dtos/user.js';

const usersRouter = Router();

usersRouter.get('/', async (req, res) => {
  const users = await UserModel.find();
  res.json(users.map((user) => toUserDto(user)));
});

export { usersRouter };
