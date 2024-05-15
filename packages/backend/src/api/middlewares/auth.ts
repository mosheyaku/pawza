import { type NextFunction, type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../../config.js';
import { AppNotAuthorizedError } from '../../errors/app-not-authorized.js';
import { AppError } from '../../errors/base.js';
import { logger } from '../../logger.js';

const getJwtFromHeader = (req: Request<Record<string, string>, unknown, unknown, unknown>): string | null => {
  if (
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
  ) {
    return req.headers.authorization.split(' ')[1];
  }

  return null;
};

// Need async verify to make life easy
const verifyToken = async (token: string, secret: string): Promise<any> =>
  await new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded);
    });
  });

export const auth =
  () => async (req: Request<Record<string, string>, unknown, unknown, unknown>, res: Response, next: NextFunction) => {
    const token = getJwtFromHeader(req);
    if (!token) {
      throw new AppNotAuthorizedError();
    }

    try {
      const decoded = await verifyToken(token, JWT_SECRET);

      if (!decoded || typeof decoded === 'string' || !decoded.id || typeof decoded.id !== 'string') {
        logger.warn('Unexpected JWT verification error', { token, decoded });
        throw new AppNotAuthorizedError();
      }

      req.user = {
        id: decoded.id,
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

    interface User {
      id: string;
    }
  }
}
