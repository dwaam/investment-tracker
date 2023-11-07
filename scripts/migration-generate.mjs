#!/usr/bin/env zx

const script = async () => {
  const TYPEORM_COMMAND = 'env-cmd npm run typeorm';
  const DATASOURCE_ARGUMENT = '-d ./src/config/database/ormconfig-migration.ts';

  const ACTIONS =  ['CREATE', 'GENERATE', 'RUN', 'SHOW', 'REVERT'];
  const whichActionQuestion = `Which action do you want to do (${ACTIONS}):
`;

  const migrationChoice = await question(whichActionQuestion, {
    choices: ACTIONS
  })

  async function run() {
    const runCommand = TYPEORM_COMMAND + ' -- ' + 'migration:run' + ' -- ' + DATASOURCE_ARGUMENT;

    const q = $.quote
    $.quote = v => v
    $`${runCommand}`
    $.quote = q
  }

  async function generate() {
    const nameOfTheMigration = await question('Name of the migration:')

    const generateCommand = TYPEORM_COMMAND + ' -- ' + 'migration:generate ./src/migrations/' + nameOfTheMigration + ' -- ' + DATASOURCE_ARGUMENT;

    const GENERATE = $.quote
    $.quote = v => v
    $`${generateCommand}`
    $.quote = GENERATE;
  }

  async function create() {
    const nameOfTheMigration = await question('Name of the migration:')

    const createCommand = 'typeorm migration:create ./src/migrations/' + nameOfTheMigration;

    const GENERATE = $.quote
    $.quote = v => v
    $`${createCommand}`
    $.quote = GENERATE;
  }

  switch (migrationChoice) {
    case 'CREATE':
      await create();
      break;
    case 'GENERATE':
      await generate();
      break;
    case 'RUN':
      await run();
      break;
    case 'SHOW':
      await $`env-cmd npm run typeorm -- migration:show -- -d ./src/config/database/ormconfig-migration.ts`;
      break;
    case 'REVERT':
      await $`env-cmd npm run typeorm -- migration:revert -- -d ./src/config/database/ormconfig-migration.ts`;
      break;
  }
};

void script();
