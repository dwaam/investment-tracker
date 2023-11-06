import { Module } from '@nestjs/common';

import { AssetController } from '@/models/asset/asset.controller';
import { StockIntegrationService } from '@/models/asset/stock-integration/stock-integration.service';
import { StockTransactionModule } from '@/models/stock/stock-transaction/stock-transaction.module';
import { DividendModule } from '@/models/stock/dividend/dividend.module';
import { StockIndexModule } from '@/models/stock/stock-index/stock-index.module';

@Module({
  controllers: [AssetController],
  providers: [StockIntegrationService],
  imports: [StockTransactionModule, DividendModule, StockIndexModule],
})
export class AssetModule {}
