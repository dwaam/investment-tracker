import { InvestedAmountsByMonth, InvestedAmountsByMonthRaw } from '@/models/stock/stock.interface';
import { TransactionTypeEnum } from '@/models/stock/stock-transaction/stock-transaction.enum';

export function convertToInvestedAmountsByMonth(amountsRaw: InvestedAmountsByMonthRaw[]): InvestedAmountsByMonth[] {
  return amountsRaw.map((amountRow) => ({
    month: new Date(amountRow.month),
    amount: +amountRow.amount,
    action: amountRow.action as TransactionTypeEnum,
  }));
}
