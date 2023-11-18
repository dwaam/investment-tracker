import { PickType } from '@nestjs/mapped-types';

import { Asset } from '@/models/asset/asset.entity';

export class CreateAsset extends PickType(Asset, ['account', 'type'] as const) {}
