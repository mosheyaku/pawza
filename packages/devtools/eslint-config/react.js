module.exports = {
  extends: [
    'airbnb-base',
    'airbnb-typescript',
    './base.js',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
  ],
  plugins: ['react', 'react-refresh'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'import/no-default-export': 'off',

    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
};
