/* eslint-disable no-fallthrough */

import fs from 'fs';
import http from 'http';
import https from 'https';
import path from 'path';

import { app } from './app.js';
import { IS_PROD, port } from './config.js';
import { logger } from './logger.js';

// Default onError
const onError = (error: any) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(`port requires elevated privileges. error - ${error}. bind - ${bind}`);
      process.exit(1);
    case 'EADDRINUSE':
      logger.error(`port is already in use.  error - ${error}. bind - ${bind}`);
      process.exit(1);
    default:
      throw error;
  }
};

export const startServer = async () =>
  await new Promise<void>((resolve) => {
    app.set('port', port);

    const server = (() => {
      if (!IS_PROD) {
        return http.createServer(app);
      }

      const pemPath = '/etc/letsencrypt/live/pawza.xyz';

      const key = fs.readFileSync(path.resolve(pemPath, './privkey.pem'));
      const cert = fs.readFileSync(path.resolve(pemPath, './fullchain.pem'));
      return https.createServer({ key, cert }, app);
    })();

    server.on('error', onError);
    server.on('listening', () => {
      logger.info(`Listening on port ${port} 🚀`);
      resolve();
    });
    server.listen(port);

    if (IS_PROD) {
      const httpRedirectServer = http.createServer((req, res) => {
        // Redirect to HTTPS
        res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
        res.end();
      });

      // Listen on port 80
      httpRedirectServer.listen(80, () => {
        logger.info('Redirect server is up');
      });
    }
  });
