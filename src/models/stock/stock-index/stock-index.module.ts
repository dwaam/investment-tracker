import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StockIndexController } from '@/models/stock/stock-index/stock-index.controller';
import { StockIndexService } from '@/models/stock/stock-index/stock-index.service';
import { StockIndex } from '@/models/stock/stock-index/stock-index.entity';

@Module({
  controllers: [StockIndexController],
  imports: [TypeOrmModule.forFeature([StockIndex])],
  providers: [StockIndexService],
})
export class StockIndexModule {}
