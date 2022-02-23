import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { StockTransactionService } from '@/models/stock-transaction/stock-transaction.service';
import { StockTransaction } from '@/models/stock-transaction/stock-transaction.entity';
import { defaultStockTransaction } from '../../utils/transaction.fake-data';

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
      await stockTransactionService.saveOne(defaultStockTransaction);

      expect(stockTransactionRepositoryMock.save).toHaveBeenCalledWith(defaultStockTransaction);
    });
  });

  describe('saveAll', () => {
    it('Should call repository to save transaction when "saveOne" is called.', async () => {
      const transactions: StockTransaction[] = [
        defaultStockTransaction,
        {
          ...defaultStockTransaction,
          id: 'TOTO',
        },
      ];

      await stockTransactionService.saveAll(transactions);

      expect(stockTransactionRepositoryMock.save).toHaveBeenCalledWith(transactions);
    });
  });
});
