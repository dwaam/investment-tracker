import { createLogger, format, Logger, transports } from 'winston';

import { PRODUCTION } from '@/common.constants';

const logFormatter = format.printf((info) => {
  const { timestamp, level, stack, message, service } = info;

  const defaultMessage = `${timestamp} - ${service} - ${level}: ${message}`;

  const stackMessage = stack ? `\n ${stack}` : '';

  return defaultMessage.concat(stackMessage);
});

export const simpleFormatter = new transports.Console({
  format: format.combine(format.colorize(), format.simple(), format.timestamp(), logFormatter),
});

export const jsonFormatter = new transports.Console({
  format: format.combine(format.json(), format.timestamp()),
});

export function getLoggerFor(component: string): Logger {
  const formatter = process.env.NODE_ENV === PRODUCTION ? jsonFormatter : simpleFormatter;

  return createLogger({
    format: format.errors({ stack: true }),
    defaultMeta: { service: component },
    transports: [formatter],
  });
}
