import { Repository } from 'typeorm';

import { CustomRepository } from '@/config/database/toDelete/typeorm-ex.decorator';
import { AssetEntry } from '@/models/asset/asset-entry/asset-entry.entity';

@CustomRepository(AssetEntry)
export class AssetEntryRepository extends Repository<AssetEntry> {}
