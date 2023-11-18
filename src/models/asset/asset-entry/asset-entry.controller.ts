import { Body, Controller, Param, Post } from '@nestjs/common';

import { AssetEntryService } from '@/models/asset/asset-entry/asset-entry.service';
import { CreateAssetEntry } from '@/models/asset/asset-entry/asset-entry.interfaces';
import { AssetEntry } from '@/models/asset/asset-entry/asset-entry.entity';

@Controller('/assets/:assetId/entries')
export class AssetEntryController {
  constructor(private assetEntryService: AssetEntryService) {}

  @Post()
  async createOne(@Param('assetId') assetId: string, @Body() createAssetEntry: CreateAssetEntry): Promise<AssetEntry> {
    return this.assetEntryService.create(assetId, createAssetEntry);
  }
}
