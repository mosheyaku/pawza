import { AppError } from './base.js';

export class AppBadRequestError extends AppError {
  statusCode = 400;
  defaultClientMessage = 'Bad request';
}
