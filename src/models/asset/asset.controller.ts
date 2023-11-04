import { Controller, Param, Post, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';

import { StockIntegrationService } from '@/models/asset/stock-integration/stock-integration.service';

@Controller('asset')
export class AssetController {
  constructor(private stockIntegrationService: StockIntegrationService) {}

  @Post(':filename')
  @UseInterceptors(
    FileInterceptor('file_asset', {
      storage: multer.diskStorage({
        destination: './files',
        filename: function (req, file, cb) {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  uploadFile(@Param() params): void {
    return this.stockIntegrationService.readFile(`files/${params.filename}`);
  }
}
