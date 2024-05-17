import { AppError } from './base.js';

export class AppBadRequestError extends AppError {
  status = 400;
  defaultClientMessage = 'Bad request';
}
