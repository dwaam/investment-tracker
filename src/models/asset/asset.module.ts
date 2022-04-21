import { Module } from '@nestjs/common';

import { AssetController } from '@/models/asset/asset.controller';
import { StockIntegrationService } from '@/models/asset/stock-integration/stock-integration.service';
import { StockTransactionModule } from '@/models/stock/stock-transaction/stock-transaction.module';

@Module({
  controllers: [AssetController],
  providers: [StockIntegrationService],
  imports: [StockTransactionModule],
})
export class AssetModule {}
