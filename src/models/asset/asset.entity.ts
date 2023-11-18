import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { IsEnum, IsString, IsUUID } from 'class-validator';

import { AssetType } from '@/models/asset/asset.enum';
import { AssetEntry } from '@/models/asset/asset-entry/asset-entry.entity';
import { User } from '@/models/user/user.entity';

@Entity('asset')
export class Asset {
  @IsUUID()
  @PrimaryColumn({ name: 'id', type: 'uuid', generated: 'uuid' })
  id: string;

  @IsString()
  @Column({ name: 'account', type: 'text' })
  account: string;

  @IsEnum(AssetType)
  @Column({ name: 'type', type: 'enum', enum: AssetType })
  type: AssetType;

  @OneToMany(() => AssetEntry, (entry) => entry.asset)
  entries: AssetEntry[];

  @IsUUID()
  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @JoinColumn({ name: 'asset_id' })
  @ManyToOne(() => User, (user) => user.assets)
  user: User;
}
