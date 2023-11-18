import { Dictionary } from 'express-serve-static-core';
import { PickType } from '@nestjs/mapped-types';

import { Dividend } from '@/models/stock/dividend/dividend.entity';

export interface SummaryForDividendsFromSameCountry {
  totalNet: number;
  totalBrut: number;
  payAsYouEarn: number;
  taxRateToApply: number;
}

export interface TaxForm {
  formNumber: number;
  fields?: {
    field: string;
    comment: string;
    value: number;
  }[];
  dividendsByCountry?: Dictionary<SummaryForDividendsFromSameCountry>;
}

export class UpsertDividend extends PickType(Dividend, [
  'date',
  'stockId',
  'numberOfShares',
  'pricePerShare',
  'type',
  'totalInEuro',
  'withholdingTax',
  'userId',
  'account',
] as const) {}
