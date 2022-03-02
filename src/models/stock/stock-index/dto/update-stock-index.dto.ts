import { IsDefined, IsEnum } from 'class-validator';

import { StockCategory } from '../stock-index.enum';

export class UpdateStockIndexDto {
  @IsDefined()
  id: string;

  @IsDefined()
  @IsEnum(StockCategory)
  category: StockCategory;
}
