import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { entities } from '@/config/database/ormconfig';

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 56432,
  username: 'admin',
  password: 'admin-integration',
  database: 'investment-tracker',
  entities,
  dropSchema: true,
  synchronize: true,
};
