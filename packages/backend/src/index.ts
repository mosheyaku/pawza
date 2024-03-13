import 'dotenv/config';

import { logger } from './logger.js';
import { startServer } from './server.js';
import { setup, teardown } from './setup.js';

async function main() {
  try {
    await setup();
    await startServer();
  } catch (err) {
    logger.error('Critical error, cannot start app');
    logger.error(err);
  }
}

main();

process.once('SIGTERM', async () => {
  logger.info('SIGTERM received, tearing down');
  await teardown();
});

process.once('SIGINT', async () => {
  logger.info('SIGINT received, tearing down');
  await teardown();
});
