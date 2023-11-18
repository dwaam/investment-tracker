import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { Asset } from '@/models/asset/asset.entity';

@Entity('asset_entry')
export class AssetEntry {
  @PrimaryColumn({ name: 'id', type: 'uuid', generated: 'uuid' })
  id: string;

  @Column({ name: 'date', type: 'date' })
  date: Date;

  @Column({ name: 'value', type: 'numeric' })
  value: number;

  @Column({ name: 'interest_per_year', type: 'numeric', default: 0 })
  interestRatePerYear: number;

  @Column({ name: 'asset_id', type: 'uuid' })
  assetId: string;

  @JoinColumn({ name: 'asset_id' })
  @ManyToOne(() => Asset, (asset) => asset.entries)
  asset: Asset;
}
