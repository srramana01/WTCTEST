import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-config-prettier';

export default [
  {
    ignores: ['node_modules/', 'coverage/', 'test-results/', 'playwright-report/'],
  },
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: { ...globals.node },
    },
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      eqeqeq: ['error', 'always'],
      'no-console': 'off',
    },
  },
  {
    // Client scripts run in the browser; e2e tests pass callbacks into the browser.
    files: ['src/public/js/**/*.js', 'tests/e2e/**/*.js'],
    languageOptions: { globals: { ...globals.browser } },
  },
  prettier,
];
