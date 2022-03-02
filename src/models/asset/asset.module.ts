import { Module } from '@nestjs/common';

import { AssetController } from '@/models/asset/asset.controller';
import { StockIntegrationService } from '@/models/asset/stock-integration/stock-integration.service';
import { StockModule } from '@/models/stock/stock.module';

@Module({
  controllers: [AssetController],
  providers: [StockIntegrationService],
  imports: [StockModule],
})
export class AssetModule {}
