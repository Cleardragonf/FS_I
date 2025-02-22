module.exports = {
  preset: 'ts-jest', // Use ts-jest to handle TypeScript files
  testEnvironment: 'node', // Set the environment to Node.js
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Transform .ts files using ts-jest
  },
  testMatch: ['**/src/tests/**/*.test.ts'], // Match test files in the src/tests directory
  moduleFileExtensions: ['ts', 'js'], // Support both TypeScript and JavaScript extensions
};
