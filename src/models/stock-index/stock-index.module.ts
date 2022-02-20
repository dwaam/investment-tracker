import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StockIndexService } from './stock-index.service';
import { StockIndexController } from './stock-index.controller';
import { StockIndex } from './stock-index.entity';

@Module({
  controllers: [StockIndexController],
  imports: [TypeOrmModule.forFeature([StockIndex])],
  providers: [StockIndexService],
})
export class StockIndexModule {}
