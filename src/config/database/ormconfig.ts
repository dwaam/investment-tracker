import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { StockIndex } from '@/models/stock/stock-index/stock-index.entity';
import { StockTransaction } from '@/models/stock/stock-transaction/stock-transaction.entity';
import { Dividend } from '@/models/stock/dividend/dividend.entity';

export const entities = [StockIndex, StockTransaction, Dividend];

export const createConfig = () =>
  ({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities,
    // migrations: ['src/migration/*{.ts,.js}'],
    cli: {
      migrationsDir: 'src/migration',
    },
  } as TypeOrmModuleOptions);
