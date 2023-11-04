import { when } from 'jest-when';
import { Test, TestingModule } from '@nestjs/testing';

import { convertToStockTransactions } from '@/models/asset/stock-integration/stock-integration.converter';
import { StockTransactionService } from '@/models/stock/stock-transaction/stock-transaction.service';
import { StockIntegrationService } from '@/models/asset/stock-integration/stock-integration.service';
import { DataFromTrading212 } from '@/models/asset/asset.interface';

import { defaultDataFromTrading212, defaultStockTransaction } from '#/unit/utils/stock-transaction.fake-data';

jest.mock('@/models/asset/stock-integration/stock-integration.converter');

describe('Stock integration service', () => {
  let stockIntegrationService: StockIntegrationService;

  const stockTransactionServiceMock = {
    saveAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StockIntegrationService,
        {
          provide: StockTransactionService,
          useFactory: () => stockTransactionServiceMock,
        },
      ],
    }).compile();

    stockIntegrationService = module.get<StockIntegrationService>(StockIntegrationService);
  });

  describe('handleChunkOfData', () => {
    it("Should call integrateCommonTransactions with transactions of type 'Market buy' and 'Market sell'.", async () => {
      const transactions: DataFromTrading212[] = [
        {
          ...defaultDataFromTrading212,
          action: 'Market buy',
        },
        {
          ...defaultDataFromTrading212,
          action: 'Launch potatoes',
        },
        {
          ...defaultDataFromTrading212,
          action: 'Market sell',
        },
        {
          ...defaultDataFromTrading212,
          action: 'Obiwan Kenobi',
        },
      ];

      const integrateCommonTransactionsSpy = jest
        .spyOn(stockIntegrationService, 'integrateCommonTransactions')
        .mockResolvedValue([defaultStockTransaction]);

      stockIntegrationService.handleChunkOfData(transactions);

      expect(integrateCommonTransactionsSpy).toHaveBeenCalledWith([transactions[0], transactions[2]]);
    });
  });

  describe('integrateCommonTransactions', () => {
    it('Should save all the transaction when "integrateCommonTransactions" is called.', async () => {
      const commonTransactions = [defaultDataFromTrading212];
      const commonConvertedTransactions = [defaultStockTransaction];
      const createdTransactions = [defaultStockTransaction, defaultStockTransaction];

      when(convertToStockTransactions).calledWith(commonTransactions).mockReturnValue(commonConvertedTransactions);
      when(stockTransactionServiceMock.saveAll)
        .calledWith(commonConvertedTransactions)
        .mockReturnValue(createdTransactions);

      const result = await stockIntegrationService.integrateCommonTransactions(commonTransactions);

      expect(result).toEqual(createdTransactions);
    });
  });
});
