import { Body, Controller, Post } from '@nestjs/common';

import { StockTransactionService } from '@/models/stock/stock-transaction/stock-transaction.service';
import { StockTransaction } from '@/models/stock/stock-transaction/stock-transaction.entity';

@Controller('stocks/stock-transactions')
export class StockTransactionController {
  constructor(private stockTransactionService: StockTransactionService) {}

  @Post()
  createOne(@Body() stockTransaction: StockTransaction) {
    return this.stockTransactionService.saveOne(stockTransaction);
  }
}
