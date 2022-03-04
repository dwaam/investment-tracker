import { Test, TestingModule } from '@nestjs/testing';

import { StockTransactionService } from '@/models/stock/stock-transaction/stock-transaction.service';
import { StockTransaction } from '@/models/stock/stock-transaction/stock-transaction.entity';
import { TransactionTypeEnum } from '@/models/stock/stock-transaction/stock-transaction.enum';
import { StockBalance } from '@/models/stock/stock.interface';
import { StockTransactionRepository } from '@/models/stock/stock-transaction/stock-transaction.repository';

import { defaultStockTransaction } from '../../../utils/stock-transaction.fake-data';

describe('stock-transaction.service', () => {
  let stockTransactionService: StockTransactionService;

  const stockTransactionRepositoryMock = {
    save: jest.fn(),
    getInvestedAmountBalance: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StockTransactionService,
        {
          provide: StockTransactionRepository,
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
    it('Should call repository to save transactions when "saveAll" is called.', async () => {
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

  describe('getInvestedAmountBalance', () => {
    it('Should return the stock balance when "getInvestedAmountBalance" is called.', async () => {
      const resultFromRepository = [
        {
          action: TransactionTypeEnum.BUY,
          amount: 2,
        },
        {
          action: 'ILoveKebab',
          amount: 3,
        },
        {
          action: TransactionTypeEnum.SELL,
          amount: 4,
        },
      ];

      const expectedBalance: StockBalance = {
        bought: 2,
        sold: 4,
      };

      stockTransactionRepositoryMock.getInvestedAmountBalance.mockResolvedValue(resultFromRepository);

      const balance = await stockTransactionService.getInvestedAmountBalance();

      expect(balance).toEqual(expectedBalance);
    });
  });
});
