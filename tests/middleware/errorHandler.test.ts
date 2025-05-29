import { errorHandler } from '../../src/middleware/errorHandler';
import { NextFunction, Request, Response } from 'express';
import { log } from '../../src/utils/logger';

describe('errorHandler middleware', () => {
  it('should log the error and respond with 500 and message', () => {
    // Arrange
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as NextFunction;
    const consoleSpy = jest.spyOn(log, 'error').mockImplementation(() => {});

    const testError = new Error('something went wrong');

    // Act
    errorHandler(testError, req, res, next);

    // Assert
    expect(consoleSpy).toHaveBeenCalledWith('Unhandled error:', testError);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'something went wrong' });
    consoleSpy.mockRestore();
  });

  it('should handle non-Error values gracefully', () => {
    // Arrange
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as NextFunction;
    const consoleSpy = jest.spyOn(log, 'error').mockImplementation(() => {});

    // Act
    errorHandler('oops' as any, req, res, next);

    // Assert
    expect(consoleSpy).toHaveBeenCalledWith('Unhandled error:', 'oops');
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    consoleSpy.mockRestore();
  });
});
