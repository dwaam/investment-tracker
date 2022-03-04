module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.test\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['./src/**/*.(t|j)s'],
  coveragePathIgnorePatterns: ['.module.ts', '<rootDir>/src/migration', '<rootDir>/src/app/main.ts'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./test/unit/setupTest.ts'],
};
