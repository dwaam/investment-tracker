import { Repository } from 'typeorm';

import { BankAsset } from '@/models/banking/bank-asset/bank-asset.entity';
import { CustomRepository } from '@/config/database/toDelete/typeorm-ex.decorator';

@CustomRepository(BankAsset)
export class BankAssetRepository extends Repository<BankAsset> {}
