import 'dotenv/config';

import { logger } from './logger.js';
import { startServer } from './server.js';
import { setup, teardown } from './setup.js';

async function main() {
  try {
    logger.debug('Setting up server..');
    await setup();
    logger.debug('Setup complete');
    await startServer();
  } catch (err) {
    logger.error('Critical error, cannot start app');
    logger.error(err as string);
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
