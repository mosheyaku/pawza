import { AppError } from './base.js';

export class BadRequestError extends AppError {
  statusCode = 400;
  defaultClientMessage = 'Bad request';
}
