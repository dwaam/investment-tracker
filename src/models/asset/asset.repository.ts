import { Repository } from 'typeorm';

import { CustomRepository } from '@/config/database/toDelete/typeorm-ex.decorator';
import { Asset } from '@/models/asset/asset.entity';

@CustomRepository(Asset)
export class AssetRepository extends Repository<Asset> {}
