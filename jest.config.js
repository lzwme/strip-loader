// @ts-check

/** @type {import('@jest/types').Config.InitialOptions } */
module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/test/**/*.(test|spec).ts'],
  coveragePathIgnorePatterns: ['/node_modules/', '/test/helpers/'], // 'src/**/*.spec.ts'
};
