/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/tests/**/*.test.ts'],
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    modulePathIgnorePatterns: ['dist'],
  };
  