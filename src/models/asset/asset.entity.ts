import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { IsEnum, IsNumber, IsString, IsUUID, ValidateIf } from 'class-validator';

import { AssetType, Company } from '@/models/asset/asset.enum';
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

  @IsEnum(Company)
  @Column({ name: 'company', type: 'enum', enum: Company })
  company: Company;

  @IsEnum(AssetType)
  @Column({ name: 'type', type: 'enum', enum: AssetType })
  type: AssetType;

  @IsNumber()
  @ValidateIf((object, value) => value !== null)
  @Column({ name: 'maximum_value', type: 'numeric', nullable: true })
  maximumValue: number | null;

  @OneToMany(() => AssetEntry, (entry) => entry.asset)
  entries: AssetEntry[];

  @IsUUID()
  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @JoinColumn({ name: 'asset_id' })
  @ManyToOne(() => User, (user) => user.assets)
  user: User;
}
