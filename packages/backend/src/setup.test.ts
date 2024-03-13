import mongoose from 'mongoose';

mongoose.connect = jest.fn();

const TEST_MONGO_HOST = 'test_host';
const TEST_MONGO_USERNAME = 'test_user';
const TEST_MONGO_PASSWORD = 'test_pw';
const TEST_MONGO_DB = 'test_db';

process.env.MONGO_HOST = TEST_MONGO_HOST;
process.env.MONGO_USERNAME = TEST_MONGO_USERNAME;
process.env.MONGO_PASSWORD = TEST_MONGO_PASSWORD;
process.env.MONGO_DB = TEST_MONGO_DB;

const { setup } = await import('./setup.js');

describe('setup', () => {
  it('should call mongoose.connect on setup', async () => {
    await setup();

    expect(mongoose.connect).toHaveBeenCalledWith(
      `mongodb://${TEST_MONGO_USERNAME}:${TEST_MONGO_PASSWORD}@${TEST_MONGO_HOST}/${TEST_MONGO_DB}`,
    );
  });
});
