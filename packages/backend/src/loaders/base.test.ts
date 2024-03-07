import { type Loader, registerLoader, setup, teardown } from './base.js';

describe('base loader', () => {
  it("should call the registered loader's setup and teardown functions", async () => {
    const loader: Loader = {
      name: 'test',
      setup: jest.fn(),
      teardown: jest.fn(),
    };

    registerLoader(loader);

    expect(loader.setup).toHaveBeenCalledTimes(0);
    expect(loader.teardown).toHaveBeenCalledTimes(0);

    await setup();

    expect(loader.setup).toHaveBeenCalledTimes(1);
    expect(loader.teardown).toHaveBeenCalledTimes(0);

    await teardown();

    expect(loader.setup).toHaveBeenCalledTimes(1);
    expect(loader.teardown).toHaveBeenCalledTimes(1);
  });
});
