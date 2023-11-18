import { Controller, Headers, Param, Post, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';

import { StockIntegrationService } from '@/models/stock/stock-integration/stock-integration.service';

@Controller('stock-integrations/')
export class StockIntegrationController {
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
  uploadFile(@Param() params, @Headers('caller-id') userId: string): void {
    return this.stockIntegrationService.readFile(userId, `files/${params.filename}`);
  }
}
