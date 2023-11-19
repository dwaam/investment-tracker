import { PickType } from '@nestjs/mapped-types';

import { AssetEntry } from '@/models/asset/asset-entry/asset-entry.entity';

export class CreateAssetEntry extends PickType(AssetEntry, ['date', 'interestRatePerYear', 'value'] as const) {}
