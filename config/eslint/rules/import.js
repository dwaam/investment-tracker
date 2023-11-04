const { ERROR } = require('../constants');

const importRules = Object.freeze({
  'import/order': [
    ERROR,
    {
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
      pathGroups: [{ pattern: '@/**', group: 'internal' }],
      'newlines-between': 'always',
    },
  ],
  'no-restricted-imports': [
    'error',
    {
      patterns: [
        {
          group: ['./', '../'],
          message: 'Relative imports are not allowed.',
        },
      ],
    },
  ],
});

module.exports = { importRules };
