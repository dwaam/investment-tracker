import { CreateBankAssetDto } from '@/models/banking/dto/create-bank-asset.dto';
import { BankAssetTypeEnum } from '@/models/banking/bank-asset/bank-asset.enum';

export const defaultCreateBankAsset: CreateBankAssetDto = {
  name: 'Lot of cash',
  type: BankAssetTypeEnum.CHECKING_ACCOUNT,
  amount: 100000.99,
  percentageInterest: 1.4,
  maximumAmount: 99999999999,
  bank: {
    name: '2',
  },
};

export const defaultCreateBankAssetWithExistingBank: CreateBankAssetDto = {
  ...defaultCreateBankAsset,
  bank: {
    ...defaultCreateBankAsset.bank,
    id: 'my-beautiful-id',
  },
};
