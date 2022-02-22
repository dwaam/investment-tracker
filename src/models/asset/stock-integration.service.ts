import { Injectable } from '@nestjs/common';

@Injectable()
export class StockIntegrationService {
  async readFile(fileName: string) {
    //TODO parse file and digest data
  }
}
