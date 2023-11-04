const { ERROR } = require('../constants');

const javascriptRules = Object.freeze({
  'eol-last': ERROR,
  curly: ERROR,
  'no-else-return': ERROR,
  'no-param-reassign': [ERROR, { props: true }],
});

module.exports = { javascriptRules };
