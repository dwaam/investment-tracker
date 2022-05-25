import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { StockTransaction } from '@/models/stock/stock-transaction/stock-transaction.entity';
import { Dividend } from '@/models/stock/dividend/dividend.entity';
import { CountryTax } from '@/models/stock/country-tax/country-tax.entity';
import { StockIndex } from '@/models/stock/stock-index/stock-index.entity';

export const entities = [CountryTax, StockIndex, StockTransaction, Dividend];

export const createConfig = () =>
  ({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities,
    // entities: [__dirname + '/src/**/*.entity.ts', __dirname + '/src/**/*.entity.js'],
    // migrations: ['src/migration/*{.ts,.js}'],
    cli: {
      migrationsDir: 'src/migration',
    },
    // synchronize: true,
  } as TypeOrmModuleOptions);
