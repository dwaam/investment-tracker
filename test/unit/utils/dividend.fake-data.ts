import { Dividend } from '@/models/stock/dividend/dividend.entity';
import { DividendTypeEnum } from '@/models/stock/dividend/dividend.enum';

export const defaultDividend: Dividend = {
  date: new Date('2022-03-01 12:00:00'),
  numberOfShares: 2,
  pricePerShare: 3,
  totalInEuro: 6,
  type: DividendTypeEnum.ORDINARY,
  withholdingTax: 0.5,
  index: {
    ticker: 'MMM',
    currency: 'USD',
    id: 'R2D2',
    name: '3 M',
  },
};
