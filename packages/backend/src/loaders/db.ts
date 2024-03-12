import mongoose from 'mongoose';

import { MONGO_DB, MONGO_HOST, MONGO_PASSWORD, MONGO_USERNAME } from '../config.js';
import { logger } from '../logger.js';
import { registerLoader } from './base.js';

mongoose.connection.on('open', () => {
  logger.info('MongoDb Connected');
});

mongoose.connection.on('disconnected', () => {
  logger.error('MongoDb Disconnected');
});

registerLoader({
  name: 'db',
  setup: async () => {
    const uri = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB}`;
    await mongoose.connect(uri);
  },
  teardown: async () => {
    await mongoose.disconnect();
  },
});
