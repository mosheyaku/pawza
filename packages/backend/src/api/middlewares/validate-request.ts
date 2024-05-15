import { type NextFunction, type Request, type Response } from 'express';
import { validationResult } from 'express-validator';

import { AppBadRequestError } from '../../errors/app-bad-request.js';

export const validateRequest =
  () => (req: Request<Record<string, string>, unknown, unknown, unknown>, res: Response, next: NextFunction) => {
    const errors = validationResult(req as any);

    if (!errors.isEmpty()) {
      throw new AppBadRequestError(errors.array()[0].msg);
    }

    next();
  };
