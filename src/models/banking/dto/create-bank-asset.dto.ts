import { Min, Max, IsOptional, IsNotEmpty, IsNumber, IsString, ValidateNested, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

import { UpdateBankDto } from '@/models/banking/dto/update-bank.dto';
import { CreateBankDto } from '@/models/banking/dto/create-bank.dto';
import { BankAssetTypeEnum } from '@/models/banking/bank-asset/bank-asset.enum';

export class CreateBankAssetDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(BankAssetTypeEnum)
  @IsNotEmpty()
  type: BankAssetTypeEnum;

  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @Min(0)
  amount: number;

  @IsNumber({ maxDecimalPlaces: 2, allowInfinity: false })
  @IsOptional()
  @Min(0)
  @Max(100)
  percentageInterest: number | null;

  @IsNumber({ maxDecimalPlaces: 2, allowInfinity: false })
  @IsOptional()
  maximumAmount: number | null;

  @ValidateNested()
  @IsNotEmpty()
  @Type((options) => (options.object.bank.id ? UpdateBankDto : CreateBankDto))
  bank: CreateBankDto | UpdateBankDto;
}
