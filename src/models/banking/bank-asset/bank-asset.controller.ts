import { Body, Controller, Post } from '@nestjs/common';

import { BankAssetService } from '@/models/banking/bank-asset/bank-asset.service';
import { CreateBankAssetDto } from '@/models/banking/dto/create-bank-asset.dto';
import { BankAsset } from '@/models/banking/bank-asset/bank-asset.entity';

@Controller('bankin/bank-assets')
export class BankAssetController {
  constructor(private stockTransactionService: BankAssetService) {}

  @Post()
  async createOne(@Body() bankAssetToCreate: CreateBankAssetDto): Promise<BankAsset> {
    return this.stockTransactionService.saveOne(bankAssetToCreate);
  }
}
