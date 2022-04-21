import { Module } from '@nestjs/common';

import { StockController } from '@/models/stock/stock.controller';
import { StockIndexModule } from '@/models/stock/stock-index/stock-index.module';
import { StockTransactionModule } from '@/models/stock/stock-transaction/stock-transaction.module';
import { DividendModule } from '@/models/stock/dividend/dividend.module';

@Module({
  controllers: [StockController],
  imports: [StockIndexModule, StockTransactionModule, DividendModule],
})
export class StockModule {}
