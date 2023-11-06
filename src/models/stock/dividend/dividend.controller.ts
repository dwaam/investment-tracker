import { Controller, Get, Param } from '@nestjs/common';

import { DividendService } from '@/models/stock/dividend/dividend.service';
import { InvestedAmountsByMonthRaw } from '@/models/stock/stock.interface';
import { TaxForm } from '@/models/stock/dividend/dividend.interfaces';
import { Dividend } from '@/models/stock/dividend/dividend.entity';

@Controller('dividends')
export class DividendController {
  constructor(private dividendService: DividendService) {}

  @Get('/return-by-month')
  async getDividendByMonthy(): Promise<InvestedAmountsByMonthRaw[]> {
    return this.dividendService.getDividendByMonth();
  }

  @Get('/per-year/:year')
  async getDividendPerYear(@Param('year') year: number): Promise<Dividend[]> {
    return this.dividendService.getDividendPerYear(year);
  }

  @Get('/per-year-by-countries/:year')
  async getDividendPerYearByCountries(@Param('year') year: number) {
    return this.dividendService.getDividendPerYearByCountry(year);
  }

  @Get('/tax-form/:year')
  async getTaxFormPerYear(@Param('year') year: number): Promise<TaxForm[]> {
    return this.dividendService.getTaxFormInputForYear(year);
  }
}
