import { Controller, Get } from '@nestjs/common';

import { DividendService } from '@/models/stock/dividend/dividend.service';

@Controller('dividends')
export class DividendController {
  constructor(private dividendService: DividendService) {}

  @Get('/return-by-month')
  getDividendByMonthy() {
    return this.dividendService.getDividendByMonth();
  }
}
