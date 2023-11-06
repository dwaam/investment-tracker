import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StockIndexController } from '@/models/stock/stock-index/stock-index.controller';
import { StockIndexService } from '@/models/stock/stock-index/stock-index.service';
import { StockIndex } from '@/models/stock/stock-index/stock-index.entity';
import { TypeOrmExModule } from '@/config/database/toDelete/typeorm-ex.module';
import { StockIndexRepository } from '@/models/stock/stock-index/stock-index.repository';

@Module({
  controllers: [StockIndexController],
  imports: [TypeOrmModule.forFeature([StockIndex]), TypeOrmExModule.forCustomRepository([StockIndexRepository])],
  providers: [StockIndexService],
  exports: [StockIndexService],
})
export class StockIndexModule {}
