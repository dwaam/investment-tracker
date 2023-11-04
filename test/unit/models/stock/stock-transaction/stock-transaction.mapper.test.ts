import { convertToInvestedAmountsByMonth } from '@/models/stock/stock-transaction/stock-transaction.mapper';
import { InvestedAmountsByMonthRaw } from '@/models/stock/stock.interface';

import { defaultInvestedAmountsByMonth } from '#/unit/utils/stock-transaction.fake-data';

describe('stock-transaction.mapper', () => {
  describe('convertToInvestedAmountsByMonth', () => {
    it('Should convert raw result from repository to invested amounts by month.', () => {
      const investedAmountsByMonthRaws = defaultInvestedAmountsByMonth.map((investedAmount) => ({
        month: investedAmount.month.toString(),
        amount: investedAmount.amount.toString(),
        action: investedAmount.action.toString(),
      })) as InvestedAmountsByMonthRaw[];

      const result = convertToInvestedAmountsByMonth(investedAmountsByMonthRaws);

      expect(result).toEqual(defaultInvestedAmountsByMonth);
    });
  });
});
