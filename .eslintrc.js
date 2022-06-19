module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // eslint-disable-next-line quotes
    "no-console": "off",
    'class-methods-use-this': 'off',
    'import/first': 'off',
    'no-param-reassign': 'off',
  },
};
