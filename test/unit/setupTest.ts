import 'reflect-metadata';

import { getLoggerFor } from '@/utils/logger.util';

jest.mock('@/utils/logger.util');

export const getLoggerForMock: jest.Mock = getLoggerFor as jest.Mock;
export const loggerLogMock: jest.Mock = jest.fn();
export const loggerErrorMock: jest.Mock = jest.fn();

beforeEach(() => {
  getLoggerForMock.mockImplementation(() => ({
    log: loggerLogMock,
    error: loggerErrorMock,
  }));
});

afterEach(() => {
  jest.resetAllMocks();
});
