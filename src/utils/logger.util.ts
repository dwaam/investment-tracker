import { Logger } from '@nestjs/common';

export function getLoggerFor(component: string): Logger {
  return new Logger(component);
}
