import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { IsDate, IsNumber, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

import { Asset } from '@/models/asset/asset.entity';

@Entity('asset_entry')
export class AssetEntry {
  @IsUUID()
  @PrimaryColumn({ name: 'id', type: 'uuid', generated: 'uuid' })
  id: string;

  @Type(() => Date)
  @IsDate()
  @Column({ name: 'date', type: 'date' })
  date: Date;

  @IsNumber()
  @Column({ name: 'value', type: 'numeric' })
  value: number;

  @IsNumber()
  @Column({ name: 'interest_per_year', type: 'numeric', default: 0 })
  interestRatePerYear: number;

  @IsUUID()
  @Column({ name: 'asset_id', type: 'uuid' })
  assetId: string;

  @JoinColumn({ name: 'asset_id' })
  @ManyToOne(() => Asset, (asset) => asset.entries)
  asset: Asset;
}
