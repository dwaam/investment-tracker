import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AssetService } from '@/models/asset/asset.service';
import { AssetRepository } from '@/models/asset/asset.repository';
import { TypeOrmExModule } from '@/config/database/toDelete/typeorm-ex.module';
import { Asset } from '@/models/asset/asset.entity';
import { AssetController } from '@/models/asset/asset.controller';

@Module({
  controllers: [AssetController],
  imports: [TypeOrmModule.forFeature([Asset]), TypeOrmExModule.forCustomRepository([AssetRepository])],
  providers: [AssetService],
  exports: [AssetService],
})
export class AssetModule {}
