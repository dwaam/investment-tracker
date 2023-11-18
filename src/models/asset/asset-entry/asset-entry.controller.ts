import { Body, Controller, Post } from '@nestjs/common';

import { AssetEntryService } from '@/models/asset/asset-entry/asset-entry.service';
import { CreateAssetEntry } from '@/models/asset/asset-entry/asset-entry.interfaces';
import { AssetEntry } from '@/models/asset/asset-entry/asset-entry.entity';

@Controller('/asset-entries')
export class AssetEntryController {
  constructor(private assetEntryService: AssetEntryService) {}

  @Post()
  async createOne(@Body() createAssetEntry: CreateAssetEntry): Promise<AssetEntry> {
    return this.assetEntryService.create(createAssetEntry);
  }
}
