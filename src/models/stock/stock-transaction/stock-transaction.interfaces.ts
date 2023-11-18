import { PickType } from '@nestjs/mapped-types';

import { StockTransaction } from '@/models/stock/stock-transaction/stock-transaction.entity';

export interface InvestedAmountBalance {
  bought: number;
  sold: number;
}

export class UpsertStockTransaction extends PickType(StockTransaction, [
  'transactionId',
  'stockId',
  'action',
  'numberOfShares',
  'pricePerShare',
  'exchangeRate',
  'totalInEuro',
  'currencyConversionFee',
  'userId',
  'date',
] as const) {}
