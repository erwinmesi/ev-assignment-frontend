module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],

    // Enforce the use of single quotes
    'quotes': ['error', 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }],

    // Enforce no semicolons at the end of lines
    'semi': ['error', 'never'],

    // Allow the use of any type
    '@typescript-eslint/no-explicit-any': 'off',

    // Allow empty dependencies array in hooks
    'react-hooks/exhaustive-deps': ['off', 'never'],
  },
}
