import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { StockTransactionService } from '@/models/stock-transaction/stock-transaction.service';
import { StockTransaction } from '@/models/stock-transaction/stock-transaction.entity';
import { StockCategory } from '@/models/stock-index/stock-index.enum';

describe('stock-transaction', () => {
  let stockTransactionService: StockTransactionService;

  const stockTransactionRepositoryMock = {
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StockTransactionService,
        {
          provide: getRepositoryToken(StockTransaction),
          useFactory: () => stockTransactionRepositoryMock,
        },
      ],
    }).compile();

    stockTransactionService = module.get<StockTransactionService>(StockTransactionService);
  });

  describe('saveOne', () => {
    it('Should call repository to save transaction when "saveOne" is called.', async () => {
      const transaction: StockTransaction = {
        id: 'transaction-ONE',
        action: 'DEPOSIT',
        currencyConversionFee: 0,
        date: new Date(),
        exchangeRate: 0,
        numberOfShares: 0,
        pricePerShare: 0,
        totalInEuro: 0,
        index: {
          id: 'R2D2',
          ticker: 'MMM',
          name: '3M',
          currency: 'USD',
          category: StockCategory.CONSUMER_DISCRETIONARY,
        },
      };

      await stockTransactionService.saveOne(transaction);

      expect(stockTransactionRepositoryMock.save).toHaveBeenCalledWith(transaction);
    });
  });
});
