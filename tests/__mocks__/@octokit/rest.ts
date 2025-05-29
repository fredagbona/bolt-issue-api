import { jest } from '@jest/globals';
export class Octokit {
  issues = {
    create: jest.fn(),
  };
}
