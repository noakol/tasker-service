import { LoggerService } from '@nestjs/common';
import { IQueuePublisherService } from '@app/interfaces';

export const loggerMock = jest.mocked({
  ...jest.requireActual('@nestjs/common'),
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
} as LoggerService);

export const configServiceMock = jest.mocked({
  ...jest.requireActual('@nestjs/common'),
  get: jest.fn(() => ({
    exchanges: {
      testExchange: {
        name: 'testExchange',
        routingKey: 'testRoutingKey',
      },
    },
  })),
});

export const rabbitPublisherServiceMock = jest.mocked({
  publish: jest.fn(),
} as IQueuePublisherService);
