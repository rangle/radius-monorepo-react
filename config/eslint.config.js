/**
 * @type {import('eslint').Linter.RulesRecord}
 */
const rulesBase = {
  'import/no-default-export': 'error',
};

/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  ignorePatterns: [
    '**/dist/**',
    '**/node_modules/**',
    '**/*.d.ts',
    '**/*.js',
    '**/*.mjs',
  ],
  env: {
    browser: true,
    commonjs: true,
    es2022: true,
    jest: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
    project: 'config/typescript/tsconfig.lint.json',
  },
  extends: [
    'plugin:jsx-a11y/recommended',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:prettier/recommended',
    'prettier',
  ],
  rules: {},
  plugins: [
    '@typescript-eslint',
    'react',
    'prettier',
    'jsx-a11y',
    'jest',
    'react-hooks',
    'import',
    'testing-library',
  ],
  overrides: [
    // TS/TSX files
    {
      files: ['**/*.ts', '**/*.tsx'],
      extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
      rules: {
        semi: 'off',
      },
    },
    // disable some rules for type definition files
    {
      files: ['**/*.d.ts'],
      rules: {
        '@typescript-eslint/triple-slash-reference': 0,
        '@typescript-eslint/naming-convention': 0,
      },
    },
    // Handling of JS/JSX files
    {
      files: ['**/*.js', '**/*.jsx'],
      parser: '@babel/eslint-parser',
      parserOptions: {
        project: undefined,
        ecmaFeatures: {
          jsx: true,
          modules: true,
        },
        requireConfigFile: false,
      },
      rules: {
        ...rulesBase,
        'prettier/prettier': 0,
        '@typescript-eslint/naming-convention': 0,
      },
    },
  ],
};
