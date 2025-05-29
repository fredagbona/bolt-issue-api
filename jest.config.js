/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/tests/**/*.test.ts'],
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    modulePathIgnorePatterns: ['dist'],
    moduleNameMapper: {
        '^@octokit/rest$': '<rootDir>/tests/__mocks__/@octokit/rest.ts',
    }
  };
  