import { UnauthorizedException } from '@nestjs/common';
import * as jose from 'jose';

export function getCallerIdFromBearerToken(bearer: string): string {
  if (!bearer?.match('Bearer *')) {
    throw new UnauthorizedException();
  }

  const token = bearer.split('Bearer ')[1];

  const decodedToken = jose.decodeJwt(token);

  return decodedToken.id as string;
}
