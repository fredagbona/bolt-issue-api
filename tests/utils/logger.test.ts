import { log } from '../../src/utils/logger';

describe('logger utility', () => {
  let infoSpy: jest.SpyInstance;
  let warnSpy: jest.SpyInstance;
  let errorSpy: jest.SpyInstance;

  beforeAll(() => {
    infoSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    infoSpy.mockRestore();
    warnSpy.mockRestore();
    errorSpy.mockRestore();
  });

  it('should prefix and forward info logs', () => {
    log.info('hello', 123);
    expect(infoSpy).toHaveBeenCalledWith('[INFO]', 'hello', 123);
  });

  it('should prefix and forward warn logs', () => {
    log.warn('watch out');
    expect(warnSpy).toHaveBeenCalledWith('[WARN]', 'watch out');
  });

  it('should prefix and forward error logs', () => {
    log.error('oops', { code: 500 });
    expect(errorSpy).toHaveBeenCalledWith('[ERROR]', 'oops', { code: 500 });
  });
});
