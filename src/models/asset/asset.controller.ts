import { Body, Controller, Get, Headers, Post } from '@nestjs/common';

import { CreateAsset } from '@/models/asset/asset.interfaces';
import { AssetService } from '@/models/asset/asset.service';
import { Asset } from '@/models/asset/asset.entity';

@Controller('/assets')
export class AssetController {
  constructor(private assetService: AssetService) {}

  @Post()
  async createOne(@Headers('caller-id') callerId: string, @Body() createAsset: CreateAsset): Promise<Asset> {
    return this.assetService.create(callerId, createAsset);
  }

  @Get()
  async getAssets(@Headers('caller-id') userId: string): Promise<Asset[]> {
    return this.assetService.find(userId);
  }
}
