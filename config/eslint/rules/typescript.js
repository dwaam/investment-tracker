const { ERROR, OFF } = require('../constants');

const typeScriptRules = Object.freeze({
  '@typescript-eslint/adjacent-overload-signatures': ERROR,
  '@typescript-eslint/array-type': ERROR,
  '@typescript-eslint/await-thenable': ERROR,
  '@typescript-eslint/ban-ts-comment': ERROR,
  '@typescript-eslint/ban-tslint-comment': ERROR,
  '@typescript-eslint/consistent-type-definitions': ERROR,
  '@typescript-eslint/explicit-function-return-type': [
    ERROR,
    {
      allowExpressions: true,
    },
  ],
  '@typescript-eslint/explicit-module-boundary-types': OFF,
  '@typescript-eslint/interface-name-prefix': OFF,
  '@typescript-eslint/no-duplicate-enum-values': ERROR,
  '@typescript-eslint/no-explicit-any': ERROR,
  '@typescript-eslint/no-inferrable-types': [ERROR, { ignoreProperties: true }],
  '@typescript-eslint/no-non-null-assertion': ERROR,
  '@typescript-eslint/no-unused-vars': ERROR,
  '@typescript-eslint/prefer-enum-initializers': ERROR,
  '@typescript-eslint/prefer-optional-chain': ERROR,
  '@typescript-eslint/promise-function-async': ERROR,
  '@typescript-eslint/require-await': ERROR,
  '@typescript-eslint/return-await': [ERROR, 'never'],
});

module.exports = { typeScriptRules };
