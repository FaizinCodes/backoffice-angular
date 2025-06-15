// @ts-check
const eslint = require('@eslint/js');
const tsEslint = require('typescript-eslint');
const angularEslint = require('angular-eslint');
const prettierPlugin = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');

module.exports = tsEslint.config(
  {
    files: ['**/*.ts'],
    ignores: ['**/node_modules/**', '**/dist/**'],
    extends: [
      eslint.configs.recommended,
      ...tsEslint.configs.recommended,
      ...tsEslint.configs.stylistic,
      ...angularEslint.configs.tsRecommended,
    ],
    plugins: {
      prettier: prettierPlugin,
    },
    processor: angularEslint.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      'no-console': 'error',
      'no-debugger': 'error',
      'prettier/prettier': 'error',
      ...prettierConfig.rules,
    },
  },
  {
    files: ['**/*.html'],
    extends: [
      ...angularEslint.configs.templateRecommended,
      ...angularEslint.configs.templateAccessibility,
    ],
    rules: {
      '@angular-eslint/template/click-events-have-key-events': 'off',
      '@angular-eslint/template/interactive-supports-focus': 'off',
      '@angular-eslint/template/mouse-events-have-key-events': 'off',
    },
  }
);
