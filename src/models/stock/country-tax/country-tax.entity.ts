import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('country-tax')
export class CountryTax {
  @PrimaryColumn({ name: 'country', type: 'varchar' })
  country: string;

  @Column({ name: 'tax_percentage', type: 'double precision' })
  taxPercentage: number;
}
