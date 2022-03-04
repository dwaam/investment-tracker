import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StockTransactionController } from '@/models/stock/stock-transaction/stock-transaction.controller';
import { StockIndexController } from '@/models/stock/stock-index/stock-index.controller';
import { StockTransactionService } from '@/models/stock/stock-transaction/stock-transaction.service';
import { StockIndexService } from '@/models/stock/stock-index/stock-index.service';
import { StockTransaction } from '@/models/stock/stock-transaction/stock-transaction.entity';
import { StockIndex } from '@/models/stock/stock-index/stock-index.entity';
import { StockController } from '@/models/stock/stock.controller';
import { Dividend } from '@/models/stock/dividend/dividend.entity';
import { DividendService } from '@/models/stock/dividend/dividend.service';
import { StockTransactionRepository } from '@/models/stock/stock-transaction/stock-transaction.repository';

@Module({
  controllers: [StockTransactionController, StockIndexController, StockController],
  imports: [TypeOrmModule.forFeature([StockTransactionRepository, StockTransaction, StockIndex, Dividend])],
  providers: [StockTransactionService, StockIndexService, DividendService],
  exports: [StockTransactionService],
})
export class StockModule {}
