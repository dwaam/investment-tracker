import { Module } from '@nestjs/common';

import { StockIntegrationController } from '@/models/stock/stock-integration/stock-integration.controller';
import { StockIntegrationService } from '@/models/stock/stock-integration/stock-integration.service';
import { StockTransactionModule } from '@/models/stock/stock-transaction/stock-transaction.module';
import { DividendModule } from '@/models/stock/dividend/dividend.module';
import { StockIndexModule } from '@/models/stock/stock-index/stock-index.module';

@Module({
  controllers: [StockIntegrationController],
  providers: [StockIntegrationService],
  imports: [StockTransactionModule, DividendModule, StockIndexModule],
})
export class StockIntegrationModule {}
