import { TransactionTypeEnum } from '@/models/stock/stock-transaction/stock-transaction.enum';

export interface StockBalance {
  bought: number;
  sold: number;
}

export interface InvestedAmountsByMonthRaw {
  month: string;
  amount: string;
  action: string;
}

export interface InvestedAmountsByMonth {
  month: Date;
  amount: number;
  action: TransactionTypeEnum;
}
