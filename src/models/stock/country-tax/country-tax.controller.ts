import { Body, Controller, Get, Param, Patch } from '@nestjs/common';

import { CountryTaxService } from '@/models/stock/country-tax/country-tax.service';
import { CountryTax } from '@/models/stock/country-tax/country-tax.entity';
import { PatchCountryTax } from '@/models/stock/country-tax/country-tax.interfaces';

@Controller('stocks/country-taxes')
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

  @Patch('/:countryCode')
  async update(
    @Param('countryCode') countryCode: string,
    @Body() patchCountryTax: PatchCountryTax,
  ): Promise<CountryTax> {
    return this.countryTaxService.patch(countryCode, patchCountryTax);
  }
}
