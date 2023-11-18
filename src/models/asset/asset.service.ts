import { Injectable } from '@nestjs/common';

import { getLoggerFor } from '@/utils/logger.util';
import { AssetRepository } from '@/models/asset/asset.repository';
import { Asset } from '@/models/asset/asset.entity';
import { CreateAsset } from '@/models/asset/asset.interfaces';

@Injectable()
export class AssetService {
  private readonly logger = getLoggerFor(AssetService.name);

  constructor(private assetRepository: AssetRepository) {}

  async create(userId: string, asset: CreateAsset): Promise<Asset> {
    this.logger.info(`Creating asset for account ${asset.account} for user ${userId}.`);

    return this.assetRepository.save({
      ...asset,
      userId,
    });
  }

  async find(userId: string): Promise<Asset[]> {
    this.logger.info(`Find assets for user ${userId}.`);

    return this.assetRepository.findBy({ userId });
  }
}
