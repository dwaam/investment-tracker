import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StockTransactionController } from '@/models/stock/stock-transaction/stock-transaction.controller';
import { StockTransactionService } from '@/models/stock/stock-transaction/stock-transaction.service';
import { StockTransaction } from '@/models/stock/stock-transaction/stock-transaction.entity';
import { StockTransactionRepository } from '@/models/stock/stock-transaction/stock-transaction.repository';

@Module({
  controllers: [StockTransactionController],
  imports: [TypeOrmModule.forFeature([StockTransactionRepository, StockTransaction])],
  providers: [StockTransactionService],
  exports: [StockTransactionService],
})
export class StockTransactionModule {}
