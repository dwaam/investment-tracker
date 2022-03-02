import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AssetModule } from '@/models/asset/asset.module';
import { StockModule } from '@/models/stock/stock.module';
import { config } from '@/config/database/ormconfig';

@Module({
  imports: [
    StockModule,
    AssetModule,
    TypeOrmModule.forRoot(config),
  ],
})
export class AppModule {}
