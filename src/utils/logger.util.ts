import { Logger } from '@nestjs/common';

export function getLoggerFor(component: string) {
  return new Logger(component);
}
