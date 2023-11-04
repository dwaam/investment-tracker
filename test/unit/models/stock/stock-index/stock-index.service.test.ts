import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { StockIndexService } from '@/models/stock/stock-index/stock-index.service';
import { StockIndex } from '@/models/stock/stock-index/stock-index.entity';

import { defaultStockIndex, defaultStockIndexDto } from '#/unit/utils/stock-index.fake-data';

describe('stock-index.service', () => {
  let stockIndexService: StockIndexService;

  const stockIndexRepositoryMock = {
    find: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StockIndexService,
        {
          provide: getRepositoryToken(StockIndex),
          useFactory: () => stockIndexRepositoryMock,
        },
      ],
    }).compile();

    stockIndexService = module.get<StockIndexService>(StockIndexService);
  });

  describe('findAll', () => {
    it('Should call repository to save transactions when "saveAll" is called.', async () => {
      const stockIndexes: StockIndex[] = [
        defaultStockIndex,
        {
          ...defaultStockIndex,
          id: 'R2D2',
        },
      ];

      stockIndexRepositoryMock.find.mockResolvedValue(stockIndexes);

      const result = await stockIndexService.findAll();

      expect(result).toEqual(stockIndexes);
    });
  });

  describe('update', () => {
    it('Should call repository with index to update when "update" is called.', async () => {
      await stockIndexService.update(defaultStockIndexDto);

      expect(stockIndexRepositoryMock.update).toHaveBeenCalledWith(defaultStockIndexDto.id, defaultStockIndexDto);
    });
  });
});
