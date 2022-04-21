import { Injectable } from '@nestjs/common';

import { getLoggerFor } from '@/utils/logger.util';
import { BankAssetRepository } from '@/models/banking/bank-asset/bank-asset.repository';
import { CreateBankAssetDto } from '@/models/banking/dto/create-bank-asset.dto';

@Injectable()
export class BankAssetService {
  private readonly logger = getLoggerFor('BankAssetService');

  constructor(private bankAssetRepository: BankAssetRepository) {}

  saveOne(bankAsset: CreateBankAssetDto) {
    this.logger.log(`Save new bank asset named: ${bankAsset.name}`);

    return this.bankAssetRepository.save(bankAsset);
  }
}
