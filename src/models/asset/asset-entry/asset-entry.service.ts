import { Injectable } from '@nestjs/common';

import { getLoggerFor } from '@/utils/logger.util';
import { AssetEntryRepository } from '@/models/asset/asset-entry/asset-entry.repository';
import { AssetEntry } from '@/models/asset/asset-entry/asset-entry.entity';
import { CreateAssetEntry } from '@/models/asset/asset-entry/asset-entry.interfaces';

@Injectable()
export class AssetEntryService {
  private readonly logger = getLoggerFor(AssetEntryService.name);

  constructor(private assetRepository: AssetEntryRepository) {}

  async create(assetId: string, asset: CreateAssetEntry): Promise<AssetEntry> {
    this.logger.info(`Creating asset entry for asset ${assetId}.`);

    return this.assetRepository.save({
      ...asset,
      assetId,
    });
  }
}
