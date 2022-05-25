import { Controller } from '@nestjs/common';

import { CountryTaxService } from '@/models/stock/country-tax/country-tax.service';

@Controller('country')
export class CountryTaxController {
  constructor(private countryTaxService: CountryTaxService) {}
}
