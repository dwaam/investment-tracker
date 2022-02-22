import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StockIndexModule } from '@/models/stock-index/stock-index.module';
import { StockIndex } from '@/models/stock-index/stock-index.entity';
import { StockTransaction } from '@/models/stock-transaction/stock-transaction.entity';
import { StockTransactionModule } from '@/models/stock-transaction/stock-transaction.module';
import { AssetModule } from '@/models/asset/asset.module';

@Module({
  imports: [
    StockIndexModule,
    StockTransactionModule,
    AssetModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 55432,
      username: 'admin',
      password: 'admin-local',
      database: 'investment-tracker',
      // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      entities: [StockIndex, StockTransaction],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
