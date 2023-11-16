import { DataFromTrading212 } from '@/models/stock/stock-integration/asset.interface';
import { StockTransaction } from '@/models/stock/stock-transaction/stock-transaction.entity';
import {
  convertToStockTransaction,
  convertToStockTransactions,
} from '@/models/stock/stock-integration/stock-integration.converter';

import { defaultDataFromTrading212, defaultStockTransaction } from '#/unit/utils/stock-transaction.fake-data';

describe('Stock integration converter', () => {
  describe('convertToStockTransaction', () => {
    it('Should convert transaction from file to stock transaction.', () => {
      expect(convertToStockTransaction(defaultDataFromTrading212)).toEqual(defaultStockTransaction);
    });
  });

  describe('convertToStockTransactions', () => {
    it('Should convert transactions from file to stock transactions.', () => {
      const transactionsFromFile: DataFromTrading212[] = [
        defaultDataFromTrading212,
        {
          ...defaultDataFromTrading212,
          transactionId: 'PIOU',
        },
      ];

      const expectedTransactions: StockTransaction[] = [
        defaultStockTransaction,
        {
          ...defaultStockTransaction,
          id: 'PIOU',
        },
      ];

      expect(convertToStockTransactions(transactionsFromFile)).toEqual(expectedTransactions);
    });
  });
});
