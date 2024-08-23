module.exports = {
    testEnvironment: 'jest-environment-jsdom', // For React/front-end tests
    transform: {
      '^.+\\.jsx?$': 'babel-jest', // Transform JS and JSX using Babel
      '^.+\\.tsx?$': 'ts-jest', // Transform TypeScript/TSX
    },
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    testMatch: ['<rootDir>/src/components/**/*.test.{js,jsx,ts,tsx}'], // Match frontend test files
  };
  