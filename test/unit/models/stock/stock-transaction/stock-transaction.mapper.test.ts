import { convertToInvestedAmountsByMonth } from '@/models/stock/stock-transaction/stock-transaction.mapper';

import { defaultInvestedAmountsByMonth } from '../../../utils/stock-transaction.fake-data';
import { InvestedAmountsByMonthRaw } from '@/models/stock/stock.interface';

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
