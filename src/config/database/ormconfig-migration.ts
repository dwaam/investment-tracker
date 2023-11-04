import { DataSource } from 'typeorm';

import { entities } from '@/config/database/ormconfig';

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities,
  migrations: ['src/migrations/*{.ts,.js}'],
  synchronize: false,
});

export default dataSource;
