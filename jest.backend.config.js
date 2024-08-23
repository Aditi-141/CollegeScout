export default {
    testEnvironment: 'node', // Node.js for backend tests
    transform: {
      '^.+\\.(js|ts)$': 'babel-jest', // Use babel-jest for JS/TS files
    },
    testMatch: ['<rootDir>/src/controllers/**/*.test.{js,ts}', '<rootDir>/src/test/**/*.test.{js,ts}'], // Match only backend tests
    moduleFileExtensions: ['js', 'ts'],
  };
  