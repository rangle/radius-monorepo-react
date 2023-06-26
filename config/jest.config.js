module.exports = {
  setupFilesAfterEnv: ['<rootDir>/config/jest/setup-tests.ts'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/file-mock.js',
    '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/file-mock.js',
  },
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        diagnostics: true,
        tsconfig: '<rootDir>/config/typescript/tsconfig.lint.json',
      },
    ],
  },
  testPathIgnorePatterns: ['.d.ts'],
  modulePathIgnorePatterns: ['dist', '<rootDir>/storybook-static'],
  rootDir: '../',
};
