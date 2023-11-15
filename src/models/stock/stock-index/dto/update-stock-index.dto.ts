import { IsDefined, IsEnum } from 'class-validator';

import { StockCategory } from '@/models/stock/stock-index/stock-index.enum';

export class UpdateStockIndexDto {
  @IsDefined()
  @IsEnum(StockCategory)
  category: StockCategory;
}
