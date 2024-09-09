import { AppError } from './base.js';

export class AppForbiddenError extends AppError {
  status = 403;
  defaultClientMessage = 'Forbidden';
}
