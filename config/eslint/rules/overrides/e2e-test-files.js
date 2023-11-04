const { OFF } = require('../../constants');

const e2eTestFilesOverride = Object.freeze({
  files: ['*.e2e-spec.ts'],
  rules: {
    'jest/expect-expect': OFF,
    'jest/prefer-strict-equal': OFF,
    'jest/no-test-return-statement': OFF,
  },
});

module.exports = { e2eTestFilesOverride };
