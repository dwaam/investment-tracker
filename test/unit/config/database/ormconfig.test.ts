import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { createConfig, entities } from '@/config/database/ormconfig';

describe('ormconfig', () => {
  describe('config', () => {
    const originalEnv = { ...process.env };

    const port = 1234;
    const host = 'database.com';
    const username = 'ImKevin';
    const password = 'myBeautifulPassword';
    const databaseName = 'investment-tracker';

    beforeEach(() => {
      process.env.DATABASE_HOST = host;
      process.env.DATABASE_PORT = port.toString();
      process.env.DATABASE_USERNAME = username;
      process.env.DATABASE_PASSWORD = password;
      process.env.DATABASE_NAME = databaseName;
    });

    afterEach(() => {
      process.env = { ...originalEnv };
    });

    it('Should return config with correct environment variables.', () => {
      const expectedConfig: TypeOrmModuleOptions = {
        type: 'postgres',
        host,
        port,
        username,
        password,
        database: databaseName,
        entities,
        cli: {
          migrationsDir: 'src/migration',
        },
      };

      expect(createConfig()).toEqual(expectedConfig);
    });
  });
});
