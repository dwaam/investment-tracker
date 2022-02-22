import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StockIndexService } from '@/models/stock-index/stock-index.service';
import { StockIndexController } from '@/models/stock-index/stock-index.controller';
import { StockIndex } from '@/models/stock-index/stock-index.entity';

@Module({
  controllers: [StockIndexController],
  imports: [TypeOrmModule.forFeature([StockIndex])],
  providers: [StockIndexService],
})
export class StockIndexModule {}
