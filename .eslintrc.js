const { typeScriptRules } = require('./config/eslint/rules/typescript');
const { importRules } = require('./config/eslint/rules/import');
const { eslintConfigFilesOverride } = require('./config/eslint/rules/overrides/eslint-config-files');
const { globalTestFilesOverride } = require('./config/eslint/rules/overrides/global-test-files');
const { e2eTestFilesOverride } = require('./config/eslint/rules/overrides/e2e-test-files');
const { functionalityTestFilesOverride } = require('./config/eslint/rules/overrides/functionality-test-files');
const { javascriptRules } = require('./config/eslint/rules/javascript');

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'eslint-plugin-import', 'jest'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:jest/recommended'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['nodes_modules/', 'libs/core/node_modules', 'libs/core/dist', 'dist/', 'coverage/'],
  rules: {
    ...javascriptRules,
    ...importRules,
    ...typeScriptRules,
  },
  overrides: [eslintConfigFilesOverride, globalTestFilesOverride, e2eTestFilesOverride, functionalityTestFilesOverride],
};
