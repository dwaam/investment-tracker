import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BankAssetController } from '@/models/banking/bank-asset/bank-asset.controller';
import { BankAssetRepository } from '@/models/banking/bank-asset/bank-asset.repository';
import { BankAsset } from '@/models/banking/bank-asset/bank-asset.entity';
import { Bank } from '@/models/banking/bank/bank.entity';
import { BankAssetService } from '@/models/banking/bank-asset/bank-asset.service';

@Module({
  controllers: [BankAssetController],
  imports: [TypeOrmModule.forFeature([BankAssetRepository, BankAsset, Bank])],
  providers: [BankAssetService],
})
export class BankinModule {}
