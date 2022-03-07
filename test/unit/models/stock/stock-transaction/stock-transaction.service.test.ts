import { Test, TestingModule } from '@nestjs/testing';
import { when } from 'jest-when';

import { StockTransactionService } from '@/models/stock/stock-transaction/stock-transaction.service';
import { StockTransaction } from '@/models/stock/stock-transaction/stock-transaction.entity';
import { TransactionTypeEnum } from '@/models/stock/stock-transaction/stock-transaction.enum';
import { InvestedAmountsByMonthRaw, StockBalance } from '@/models/stock/stock.interface';
import { StockTransactionRepository } from '@/models/stock/stock-transaction/stock-transaction.repository';
import { convertToInvestedAmountsByMonth } from '@/models/stock/stock-transaction/stock-transaction.mapper';

import { defaultInvestedAmountsByMonth, defaultStockTransaction } from '../../../utils/stock-transaction.fake-data';
import { loggerLogMock } from '../../../setupTest';

jest.mock('@/models/stock/stock-transaction/stock-transaction.mapper');

describe('stock-transaction.service', () => {
  let stockTransactionService: StockTransactionService;

  const stockTransactionRepositoryMock = {
    save: jest.fn(),
    getInvestedAmountBalance: jest.fn(),
    getAmountInvestedByMonth: jest.fn(),
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

    beforeEach(() => {
      stockTransactionRepositoryMock.getInvestedAmountBalance.mockResolvedValue(resultFromRepository);
    });

    it('Should return the stock balance when "getInvestedAmountBalance" is called.', async () => {
      const balance = await stockTransactionService.getInvestedAmountBalance();

      expect(balance).toEqual(expectedBalance);
    });

    it('Should log an info message when "getInvestedAmountBalance" is called.', async () => {
      await stockTransactionService.getInvestedAmountBalance();

      expect(loggerLogMock).toHaveBeenCalledTimes(1);
      expect(loggerLogMock).toHaveBeenCalledWith('Get invested amount balance');
    });
  });

  describe('getAmountInvestedByMonthy', () => {
    const resultFromRepository: InvestedAmountsByMonthRaw[] = [
      {
        action: 'toto',
        amount: '12',
        month: 'TOMORROW',
      },
    ];

    beforeEach(() => {
      stockTransactionRepositoryMock.getAmountInvestedByMonth.mockResolvedValue(resultFromRepository);
      when(convertToInvestedAmountsByMonth as jest.Mock)
        .calledWith(resultFromRepository)
        .mockReturnValue(defaultInvestedAmountsByMonth);
    });

    it('Should return the amount invested by month and action when "getAmountInvestedByMonthy" is called.', async () => {
      const result = await stockTransactionService.getInvestedAmountsByMonth();

      expect(result).toEqual(defaultInvestedAmountsByMonth);
    });

    it('Should log an info message when "getAmountInvestedByMonthy" is called.', async () => {
      await stockTransactionService.getInvestedAmountsByMonth();

      expect(loggerLogMock).toHaveBeenCalledTimes(1);
      expect(loggerLogMock).toHaveBeenCalledWith('Get invested amounts by month');
    });
  });
});
