import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StockTransactionController } from './stock-transaction.controller';
import { StockTransaction } from './stock-transaction.entity';
import { StockTransactionService } from './stock-transaction.service';

@Module({
  controllers: [StockTransactionController],
  imports: [TypeOrmModule.forFeature([StockTransaction])],
  providers: [StockTransactionService],
})
export class StockTransactionModule {}
