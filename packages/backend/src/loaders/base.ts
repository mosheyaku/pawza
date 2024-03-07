import { logger } from '../logger.js';

export interface Loader {
  name: string;
  setup?: () => Promise<void>;
  teardown?: () => Promise<void>;
}

const loaders: Loader[] = [];

type SetupStatus = 'pre-setup' | 'setting up' | 'running' | 'tearing down' | 'terminated';
let status: SetupStatus = 'pre-setup';

export const registerLoader = (loader: Loader) => {
  if (status !== 'pre-setup') {
    throw new Error(`Attempt to register loader ${loader.name} but setup was already called. Status is ${status}`);
  }

  loaders.push(loader);
  logger.info(`Registered loader: ${loader.name}`);
};

export const setup = async () => {
  const setupLoaders = loaders.filter((loader) => loader.setup);
  logger.info(`Setting up. Calling ${setupLoaders.length} loaders: ${setupLoaders}`);
  status = 'setting up';

  await Promise.all(
    setupLoaders.map(async (loader) => {
      logger.info(`Calling setup for ${loader.name}`);
      await loader.setup!();
    }),
  );

  status = 'running';
};

export const teardown = async () => {
  const teardownLoaders = loaders.filter((loader) => loader.teardown);
  logger.info(`Tearing down. Calling ${teardownLoaders.length} loaders: ${teardownLoaders}`);
  status = 'tearing down';

  await Promise.all(
    teardownLoaders.map(async (loader) => {
      logger.info(`Calling teardown for ${loader.name}`);
      await loader.teardown!();
    }),
  );

  status = 'terminated';
};
