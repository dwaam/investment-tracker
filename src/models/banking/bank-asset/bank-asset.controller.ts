import { Body, Controller, Post } from '@nestjs/common';

import { BankAssetService } from '@/models/banking/bank-asset/bank-asset.service';
import { CreateBankAssetDto } from '@/models/banking/dto/create-bank-asset.dto';

@Controller('bankin/bank-assets')
export class BankAssetController {
  constructor(private stockTransactionService: BankAssetService) {}

  @Post()
  createOne(@Body() bankAssetToCreate: CreateBankAssetDto) {
    return this.stockTransactionService.saveOne(bankAssetToCreate);
  }
}
