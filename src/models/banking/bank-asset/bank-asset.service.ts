import { Injectable } from '@nestjs/common';

import { getLoggerFor } from '@/utils/logger.util';
import { BankAssetRepository } from '@/models/banking/bank-asset/bank-asset.repository';
import { CreateBankAssetDto } from '@/models/banking/dto/create-bank-asset.dto';
import { BankAsset } from '@/models/banking/bank-asset/bank-asset.entity';

@Injectable()
export class BankAssetService {
  private readonly logger = getLoggerFor('BankAssetService');

  constructor(private bankAssetRepository: BankAssetRepository) {}

  async saveOne(bankAsset: CreateBankAssetDto): Promise<BankAsset> {
    this.logger.log(`Save new bank asset named: ${bankAsset.name}`);

    return this.bankAssetRepository.save(bankAsset);
  }
}
