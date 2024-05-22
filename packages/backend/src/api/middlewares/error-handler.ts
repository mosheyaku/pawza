import { type ErrorRequestHandler } from 'express';

import { AppError } from '../../errors/base.js';
import { logger } from '../../logger.js';

export const errorHandler = (): ErrorRequestHandler => async (error, req, res, next) => {
  if (error instanceof AppError) {
    logger.info(error.status, error.name, error.message);
    return res.status(error.status).json(error.message);
  }

  logger.error('Unexpected Server Error', error.message, error.stack);

  res.status(500).send();
};
