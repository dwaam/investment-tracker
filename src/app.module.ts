import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AssetModule } from '@/models/asset/asset.module';
import { StockModule } from '@/models/stock/stock.module';
import { createConfig } from '@/config/database/ormconfig';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    StockModule,
    AssetModule,
    TypeOrmModule.forRoot(createConfig()),
  ],
})
export class AppModule {}
