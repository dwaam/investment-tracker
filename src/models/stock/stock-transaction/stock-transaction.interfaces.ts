import { OmitType } from '@nestjs/mapped-types';

import { StockTransaction } from '@/models/stock/stock-transaction/stock-transaction.entity';

export interface InvestedAmountBalance {
  bought: number;
  sold: number;
}

export class UpsertStockTransaction extends OmitType(StockTransaction, ['id'] as const) {}
