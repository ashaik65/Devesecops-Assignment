// eslint.config.js (if using the new flat config format with ESLint >= 8.21)
import js from '@eslint/js';
import node from 'eslint-plugin-node';

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    plugins: {
      node,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'node/no-unsupported-features/es-syntax': 'off',
    },
  },
];
