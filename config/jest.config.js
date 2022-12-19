module.exports = {
  globals: {
    'ts-jest': {
      diagnostics: true,
      tsconfig: '<rootDir>/config/typescript/tsconfig.lint.json',
    },
  },
  setupFilesAfterEnv: ['<rootDir>/config/jest/setupTests.ts'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/fileMock.js',
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testPathIgnorePatterns: ['.d.ts'],
  modulePathIgnorePatterns: ['dist'],
  rootDir: '../',
};
