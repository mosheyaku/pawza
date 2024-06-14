import { type NextFunction, type Request, type Response } from 'express';
import mongoose from 'mongoose';

import { verifyToken } from '../../bll/auth.js';
import { AppNotAuthorizedError } from '../../errors/app-not-authorized.js';
import { AppError } from '../../errors/base.js';
import { logger } from '../../logger.js';
import { type AuthPayload } from '../dtos/auth.js';

const getJwtFromHeader = (req: Request<Record<string, string>, unknown, unknown, unknown>): string | null => {
  if (
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
  ) {
    return req.headers.authorization.split(' ')[1];
  }

  return null;
};

export const auth =
  () => async (req: Request<Record<string, string>, unknown, unknown, unknown>, res: Response, next: NextFunction) => {
    const token = getJwtFromHeader(req);
    if (!token) {
      throw new AppNotAuthorizedError();
    }

    try {
      const decoded = (await verifyToken(token)) as AuthPayload;

      if (!decoded || typeof decoded === 'string' || !decoded.userId || typeof decoded.userId !== 'string') {
        logger.warn('Unexpected JWT verification error', { token, decoded });
        throw new AppNotAuthorizedError();
      }

      req.user = {
        id: new mongoose.Types.ObjectId(decoded.userId),
        email: decoded.email,
        firstName: decoded.firstName,
      };

      next();
    } catch (e: unknown) {
      if (e instanceof AppError) {
        throw e;
      }

      throw new AppNotAuthorizedError();
    }
  };

declare global {
  namespace Express {
    interface Request {
      user: User;
    }

    interface User extends Omit<AuthPayload, 'userId'> {
      id: mongoose.Types.ObjectId;
    }
  }
}
