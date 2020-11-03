module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: ['google'],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': 0,
    'new-cap': 0,
    'max-len': [
      'error', {
        'code': 90,
      },
    ],
  },
};
