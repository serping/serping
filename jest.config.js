module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@tests/(.*)$': '<rootDir>/tests/$1',
    '^@/(.*)$': '<rootDir>/$1',
    '^@serping$': '<rootDir>/index.ts',
  },
};
