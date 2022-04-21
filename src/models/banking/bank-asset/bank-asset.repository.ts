import { EntityRepository, Repository } from 'typeorm';

import { BankAsset } from '@/models/banking/bank-asset/bank-asset.entity';

@EntityRepository(BankAsset)
export class BankAssetRepository extends Repository<BankAsset> {}
