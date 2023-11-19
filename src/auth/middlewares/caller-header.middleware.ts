import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

import { getCallerIdFromBearerToken } from '@/auth/auth.util';

@Injectable()
export class CallerHeaderMiddleware implements NestMiddleware {
  use(req: Request, _: Response, next: NextFunction): void {
    // eslint-disable-next-line no-param-reassign
    req.headers['caller-id'] = getCallerIdFromBearerToken(req.headers['authorization']);

    next();
  }
}
