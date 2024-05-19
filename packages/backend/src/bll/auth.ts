import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import { type AuthPayload, type RefreshPayload } from '../api/dtos/auth.js';
import { JWT_SECRET } from '../config.js';
import { AppNotAuthorizedError } from '../errors/app-not-authorized.js';
import { type UserDoc, UserModel } from '../models/user.js';

export const login = async (email: string, password: string) => {
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

export const generateJwtForUser = async (user: UserDoc) => {
  const payload: AuthPayload = {
    userId: user._id.toString(),
    email: user.email,
    firstName: user.firstName,
  };

  const refreshPayload: RefreshPayload = {
    userId: user._id.toString(),
    type: 'refresh',
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '5 minutes' });
  const refreshToken = jwt.sign(refreshPayload, JWT_SECRET, { expiresIn: '72 hours' });

  await UserModel.updateOne({ _id: user._id }, { refreshToken });

  return { token, refreshToken };
};

export const hashPassword = async (password: string) => await bcrypt.hash(password, 10);

export const getUserFromRefreshToken = async (refreshToken: string) => {
  const payload = (await verifyToken(refreshToken)) as RefreshPayload;

  if (payload.type !== 'refresh') {
    throw new Error('Invalid refresh token');
  }

  return await UserModel.findOne({
    _id: new mongoose.Types.ObjectId(payload.userId),
    refreshToken,
  });
};

// async verifyToken to make life easy
export const verifyToken = async (token: string): Promise<any> =>
  await new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded);
    });
  });
