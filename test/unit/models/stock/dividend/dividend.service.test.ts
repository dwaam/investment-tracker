import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { DividendService } from '@/models/stock/dividend/dividend.service';
import { Dividend } from '@/models/stock/dividend/dividend.entity';
import { DividendTypeEnum } from '@/models/stock/dividend/dividend.enum';

import { defaultDividend } from '#/unit/utils/dividend.fake-data';

describe('dividend.service', () => {
  let dividendService: DividendService;

  const dividendRepositoryMock = {
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DividendService,
        {
          provide: getRepositoryToken(Dividend),
          useFactory: () => dividendRepositoryMock,
        },
      ],
    }).compile();

    dividendService = module.get<DividendService>(DividendService);
  });

  describe('saveAll', () => {
    it('Should call repository to save dividends when "saveAll" is called.', async () => {
      const dividends: Dividend[] = [
        defaultDividend,
        {
          ...defaultDividend,
          type: DividendTypeEnum.PROPERTY_INCOME,
          date: new Date('2022-02-28 12:00:00'),
        },
      ];

      await dividendService.saveAll(dividends);

      expect(dividendRepositoryMock.save).toHaveBeenCalledWith(dividends);
    });
  });
});
