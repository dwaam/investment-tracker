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
  dividendsByCountry?: Dividend[];
}
