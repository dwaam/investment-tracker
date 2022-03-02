import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StockTransactionController } from '@/models/stock/stock-transaction/stock-transaction.controller';
import { StockIndexController } from '@/models/stock/stock-index/stock-index.controller';
import { StockTransactionService } from '@/models/stock/stock-transaction/stock-transaction.service';
import { StockIndexService } from '@/models/stock/stock-index/stock-index.service';
import { StockTransaction } from '@/models/stock/stock-transaction/stock-transaction.entity';
import { StockIndex } from '@/models/stock/stock-index/stock-index.entity';
import { StockController } from '@/models/stock/stock.controller';

@Module({
  controllers: [StockTransactionController, StockIndexController, StockController],
  imports: [TypeOrmModule.forFeature([StockTransaction, StockIndex])],
  providers: [StockTransactionService, StockIndexService],
  exports: [StockTransactionService],
})
export class StockModule {}
