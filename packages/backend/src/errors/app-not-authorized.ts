import { AppError } from './base.js';

export class AppNotAuthorizedError extends AppError {
  statusCode = 401;
  defaultClientMessage = 'Unauthorized';
}
