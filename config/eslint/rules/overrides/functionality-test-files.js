const { OFF } = require('../../constants');

const functionalityTestFilesOverride = Object.freeze({
  files: ['*.functionality-spec.ts'],
  rules: {
    'jest/expect-expect': OFF,
  },
});

module.exports = { functionalityTestFilesOverride };
