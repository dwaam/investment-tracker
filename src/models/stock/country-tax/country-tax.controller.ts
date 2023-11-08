import { Controller, Get, Param } from '@nestjs/common';

import { CountryTaxService } from '@/models/stock/country-tax/country-tax.service';
import { CountryTax } from '@/models/stock/country-tax/country-tax.entity';

@Controller('country-taxes')
export class CountryTaxController {
  constructor(private countryTaxService: CountryTaxService) {}

  @Get()
  async findAll(): Promise<CountryTax[]> {
    return this.countryTaxService.findAll();
  }

  @Get('/:countryCode')
  async find(@Param('countryCode') countryCode: string): Promise<CountryTax> {
    return this.countryTaxService.findByCountryCode(countryCode);
  }
}
