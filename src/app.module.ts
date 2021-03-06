import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AssetModule } from '@/models/asset/asset.module';
import { StockModule } from '@/models/stock/stock.module';
import { createConfig } from '@/config/database/ormconfig';
import { StockIndexModule } from '@/models/stock/stock-index/stock-index.module';
import { CountryTaxModule } from '@/models/stock/country-tax/country-tax.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    StockModule,
    AssetModule,
    StockIndexModule,
    CountryTaxModule,
    TypeOrmModule.forRoot(createConfig()),
  ],
})
export class AppModule {}
