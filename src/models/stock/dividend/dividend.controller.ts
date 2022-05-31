import { Controller, Get, Param } from '@nestjs/common';

import { DividendService } from '@/models/stock/dividend/dividend.service';

@Controller('dividends')
export class DividendController {
  constructor(private dividendService: DividendService) {}

  @Get('/return-by-month')
  getDividendByMonthy() {
    return this.dividendService.getDividendByMonth();
  }

  @Get('/per-year/:year')
  getDividendPerYear(@Param('year') year: number) {
    return this.dividendService.getDividendPerYear(year);
  }

  @Get('/per-year-by-countries/:year')
  getDividendPerYearByCountries(@Param('year') year: number) {
    return this.dividendService.getDividendPerYearByCountry(year);
  }
}
