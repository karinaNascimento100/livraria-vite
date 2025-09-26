// ESLint flat config for React + Vite
import js from '@eslint/js'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
  { ignores: ['dist/**', 'node_modules/**'] },
  js.configs.recommended,
  eslintConfigPrettier,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
    },
    rules: {
      // Apply React recommended rules first
      ...reactPlugin.configs.recommended.rules,
      // Then React Hooks rules
      ...reactHooks.configs.recommended.rules,
      // Our overrides (last wins)
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-uses-vars': 'error',
      // Keep React import allowed when unused (for some tooling/JSX transforms)
      'no-unused-vars': ['error', { varsIgnorePattern: '^React$' }],
    },
    settings: { react: { version: 'detect' } },
  },
  // Test files: enable Vitest globals to satisfy no-undef
  {
    files: ['**/*.test.{js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.vitest,
      },
    },
  },
  // Server (Node/CommonJS) files: allow require, module, __dirname, process
  {
    files: ['server/**/*.{js,cjs}'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      // Node code, relax browser-specific rules
      'no-undef': 'off',
    },
  },
]
