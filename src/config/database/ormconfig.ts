import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { StockTransaction } from '@/models/stock/stock-transaction/stock-transaction.entity';
import { Dividend } from '@/models/stock/dividend/dividend.entity';
import { CountryTax } from '@/models/stock/country-tax/country-tax.entity';
import { StockIndex } from '@/models/stock/stock-index/stock-index.entity';
import { User } from '@/models/user/user.entity';
import { Asset } from '@/models/asset/asset.entity';
import { AssetEntry } from '@/models/asset/asset-entry/asset-entry.entity';

export const entities = [CountryTax, StockIndex, StockTransaction, Dividend, User, Asset, AssetEntry];

export const createConfig = () =>
  ({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities,
    cli: {
      migrationsDir: 'src/migrations',
    },
    logging: ['error'],
  } as TypeOrmModuleOptions);
