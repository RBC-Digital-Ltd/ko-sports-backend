/** @type {import('ts-jest').JestConfigWithTsJest} */
// eslint-disable-next-line no-undef, unicorn/prefer-module
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/src/$1",
  },
};
