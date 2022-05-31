import { DataSource } from 'typeorm';

import { entities } from './ormconfig';

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities,
  // entities: [__dirname + '/src/**/*.entity.ts', __dirname + '/src/**/*.entity.js'],
  migrations: ['src/migration/*{.ts,.js}'],
  // synchronize: true,
});

export default dataSource;
