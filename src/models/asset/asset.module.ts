import { Module } from '@nestjs/common';

import { AssetController } from '@/models/asset/asset.controller';
import { StockIntegrationService } from '@/models/asset/stock-integration.service';

@Module({
  controllers: [AssetController],
  providers: [StockIntegrationService],
})
export class AssetModule {}
