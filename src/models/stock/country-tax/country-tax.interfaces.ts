import { PickType } from '@nestjs/mapped-types';

import { CountryTax } from '@/models/stock/country-tax/country-tax.entity';

export class PatchCountryTax extends PickType(CountryTax, ['taxPercentage', 'taxRateToApply'] as const) {}

export class UpdateCountryTax extends CountryTax {}
