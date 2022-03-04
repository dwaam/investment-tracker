import { Test, TestingModule } from '@nestjs/testing';

import { StockController } from '@/models/stock/stock.controller';
import { StockTransactionService } from '@/models/stock/stock-transaction/stock-transaction.service';
import { StockBalance } from '@/models/stock/stock.interface';

jest.mock('@/models/stock/stock-transaction/stock-transaction.service');

describe('stock.controller', () => {
  let stockController: StockController;

  const stockTransactionServiceMock = {
    getInvestedAmountBalance: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StockController],
      providers: [
        {
          provide: StockTransactionService,
          useFactory: () => stockTransactionServiceMock,
        },
      ],
    }).compile();

    stockController = app.get<StockController>(StockController);
  });

  describe('getInvestmentBalance', () => {
    it('Should return the stock balance.', async () => {
      const expectedBalance: StockBalance = {
        bought: 1,
        sold: 2,
      };

      stockTransactionServiceMock.getInvestedAmountBalance.mockResolvedValue(expectedBalance);

      const result = await stockController.getInvestmentBalance();

      expect(result).toEqual(expectedBalance);
    });
  });
});
