import { Controller, Get } from '@nestjs/common';

import { StockTransactionService } from '@/models/stock/stock-transaction/stock-transaction.service';
import { InvestedAmountBalance } from '@/models/stock/stock-transaction/stock-transaction.interfaces';
import { InvestedAmountsByMonth } from '@/models/stock/stock.interface';

@Controller('stocks')
export class StockController {
  constructor(private stockTransactionService: StockTransactionService) {}

  @Get('/balance')
  async getInvestmentBalance(): Promise<InvestedAmountBalance> {
    return this.stockTransactionService.getInvestedAmountBalance();
  }

  @Get('/investments-by-month')
  async getAmountInvestedByMonthy(): Promise<InvestedAmountsByMonth[]> {
    return this.stockTransactionService.getInvestedAmountsByMonth();
  }
}
