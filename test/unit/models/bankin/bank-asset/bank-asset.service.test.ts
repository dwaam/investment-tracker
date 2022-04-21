import { Test, TestingModule } from '@nestjs/testing';

import { BankAssetService } from '@/models/banking/bank-asset/bank-asset.service';
import { BankAssetRepository } from '@/models/banking/bank-asset/bank-asset.repository';

import { loggerLogMock } from '../../../setupTest';
import { defaultCreateBankAsset } from '../../../utils/bank-asset.fake-data';

describe('bank-asset.service', () => {
  let bankAssetService: BankAssetService;

  const bankAssetRepositoryMock = {
    save: jest.fn(),
    getInvestedAmountBalance: jest.fn(),
    getAmountInvestedByMonth: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BankAssetService,
        {
          provide: BankAssetRepository,
          useFactory: () => bankAssetRepositoryMock,
        },
      ],
    }).compile();

    bankAssetService = module.get<BankAssetService>(BankAssetService);
  });

  describe('saveOne', () => {
    it('Should call repository to save bank asset when "saveOne" is called.', async () => {
      await bankAssetService.saveOne(defaultCreateBankAsset);

      expect(bankAssetRepositoryMock.save).toHaveBeenCalledWith(defaultCreateBankAsset);
    });

    it('Should log an info message when "saveOne" is called.', async () => {
      await bankAssetService.saveOne(defaultCreateBankAsset);

      expect(loggerLogMock).toHaveBeenCalledTimes(1);
      expect(loggerLogMock).toHaveBeenCalledWith(`Save new bank asset named: ${defaultCreateBankAsset.name}`);
    });
  });
});
