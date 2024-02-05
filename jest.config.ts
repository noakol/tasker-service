export default {
  moduleFileExtensions: [
    'js',
    'json',
    'ts',
    'mjs',
    'cjs',
    'node',
  ],
  rootDir: 'src',
  testRegex: '.*\\.spec|test\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    '**/*use-case.ts',
    '**/*handler.ts',
  ],
  moduleNameMapper: {
    '^@web-server(.*)$': '<rootDir>/web-server/$1',
    '^@infra(.*)$': '<rootDir>/infra/$1',
    '^@app(.*)$': '<rootDir>/app/$1',
    '^axios$': require.resolve('axios'),
  },
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  testPathIgnorePatterns: [],
  setupFiles: ['<rootDir>/../jest.setup.js'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
