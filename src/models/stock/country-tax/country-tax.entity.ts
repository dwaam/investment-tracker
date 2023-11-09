import { Column, Entity, PrimaryColumn } from 'typeorm';
import { IsInt, Max, Min } from 'class-validator';

@Entity('country-tax')
export class CountryTax {
  @PrimaryColumn({ name: 'country', type: 'varchar' })
  country: string;

  @IsInt()
  @Max(100)
  @Min(0)
  @Column({ name: 'tax_percentage', type: 'double precision' })
  taxPercentage: number;

  @IsInt()
  @Max(100)
  @Min(0)
  @Column({ name: 'tax_rate_to_apply', type: 'double precision' })
  taxRateToApply: number;
}
