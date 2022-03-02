import { StockIndex } from '@/models/stock/stock-index/stock-index.entity';
import { StockCategory } from '@/models/stock/stock-index/stock-index.enum';
import { UpdateStockIndexDto } from '@/models/stock/stock-index/dto/update-stock-index.dto';

export const defaultStockIndex: StockIndex = {
  category: StockCategory.INDUSTRIALS,
  currency: 'EUR',
  id: 'C3PO',
  name: '3 M',
  ticker: 'MMM',
};

export const defaultStockIndexDto: UpdateStockIndexDto = {
  id: 'C3PO',
  category: StockCategory.CONSUMER_DISCRETIONARY,
};
