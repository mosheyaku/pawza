import 'express-async-errors';

import cors from 'cors';
import express, { type NextFunction, type Request, type Response } from 'express';
import helmet from 'helmet';
import path from 'path';

import { errorHandler } from './api/middlewares/error-handler.js';
import { indexRouter } from './api/routes/index.js';
import { IS_DEV, IS_PROD } from './config.js';

const app = express().disable('etag').disable('x-powered-by');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(helmet());
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

if (IS_DEV) {
  app.use(cors());
}

app.use('/api', indexRouter);

if (IS_PROD) {
  app.use(express.static(path.resolve(import.meta.dirname, 'public')));
  app.get('*', (req, res) => {
    res.removeHeader('Content-Security-Policy');
    res.sendFile(path.resolve(import.meta.dirname, './public', 'index.html'));
  });
}

app.use(errorHandler());

export { app };
