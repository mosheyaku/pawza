import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { type AuthPayload } from '../api/dtos/auth.js';
import { JWT_SECRET } from '../config.js';
import { AppNotAuthorizedError } from '../errors/app-not-authorized.js';
import { type UserDoc, UserModel } from '../models/user.js';

export const signIn = async (email: string, password: string) => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new AppNotAuthorizedError('Invalid credentials');
  }

  const passwordsMatch = await bcrypt.compare(password, user.password);

  if (!passwordsMatch) {
    throw new AppNotAuthorizedError('Invalid Credentials');
  }

  return user;
};

export const generateJwtForUser = (user: UserDoc) => {
  const payload: AuthPayload = {
    userId: user._id.toString(),
    email: user.email,
    firstName: user.firstName,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '5 minutes' });

  // TODO: JASON - Refresh token
  return token;
};

export const hashPassword = async (password: string) => await bcrypt.hash(password, 10);
