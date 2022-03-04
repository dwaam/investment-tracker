import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { StockIndex } from '@/models/stock/stock-index/stock-index.entity';
import { StockTransaction } from '@/models/stock/stock-transaction/stock-transaction.entity';
import { Dividend } from '@/models/stock/dividend/dividend.entity';

export const entities = [StockIndex, StockTransaction, Dividend];

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 55432,
  username: 'admin',
  password: 'admin-local',
  database: 'investment-tracker',
  entities,
  migrations: ['src/migration/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migration',
  },
}
