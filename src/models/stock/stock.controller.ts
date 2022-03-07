import { Controller, Get } from '@nestjs/common';

import { StockTransactionService } from '@/models/stock/stock-transaction/stock-transaction.service';

@Controller('stocks')
export class StockController {
  constructor(private stockTransactionService: StockTransactionService) {}

  @Get('/balance')
  getInvestmentBalance() {
    return this.stockTransactionService.getInvestedAmountBalance();
  }

  @Get('/investments-by-month')
  getAmountInvestedByMonthy() {
    return this.stockTransactionService.getInvestedAmountsByMonth();
  }
}
