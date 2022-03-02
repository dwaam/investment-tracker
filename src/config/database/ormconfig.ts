import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { StockIndex } from '@/models/stock/stock-index/stock-index.entity';
import { StockTransaction } from '@/models/stock/stock-transaction/stock-transaction.entity';
import { Dividend } from '@/models/stock/dividend/dividend.entity';

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 55432,
  username: 'admin',
  password: 'admin-local',
  database: 'investment-tracker',
  // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  entities: [StockIndex, StockTransaction, Dividend],
  migrations: ['src/migration/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migration',
  },
  synchronize: true,
}
