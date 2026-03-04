import importX from 'eslint-plugin-import-x';

export default [
  {
    plugins: {
      'import-x': importX,
    },
    rules: {
      'import-x/no-named-as-default': 'error',
    },
    settings: {
      'import-x/resolver': {
        node: true,
      },
    },
  },
];
