import { Injectable } from '@nestjs/common';
import { JwtPayload } from 'jsonwebtoken';

import type { PipeTransform } from '@nestjs/common';

@Injectable()
export class GetCallerIdPipe implements PipeTransform {
  transform(value: JwtPayload): string {
    return value.id;
  }
}
