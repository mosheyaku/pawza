import { AppError } from './base.js';

export class AppNotAuthorizedError extends AppError {
  status = 401;
  defaultClientMessage = 'Unauthorized';
}
