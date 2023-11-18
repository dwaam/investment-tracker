import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmExModule } from '@/config/database/toDelete/typeorm-ex.module';
import { AssetEntryController } from '@/models/asset/asset-entry/asset-entry.controller';
import { AssetEntry } from '@/models/asset/asset-entry/asset-entry.entity';
import { AssetEntryRepository } from '@/models/asset/asset-entry/asset-entry.repository';
import { AssetEntryService } from '@/models/asset/asset-entry/asset-entry.service';

@Module({
  controllers: [AssetEntryController],
  imports: [TypeOrmModule.forFeature([AssetEntry]), TypeOrmExModule.forCustomRepository([AssetEntryRepository])],
  providers: [AssetEntryService],
  exports: [AssetEntryService],
})
export class AssetEntryModule {}
