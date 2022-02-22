import { Body, Controller, Post } from '@nestjs/common';

import { StockTransactionService } from '@/models/stock-transaction/stock-transaction.service';
import { StockTransaction } from '@/models/stock-transaction/stock-transaction.entity';

@Controller('stock-transactions')
export class StockTransactionController {
  constructor(private stockTransactionService: StockTransactionService) {}

  @Post()
  createOne(@Body() stockTransaction: StockTransaction) {
    return this.stockTransactionService.saveOne(stockTransaction);
  }
}
