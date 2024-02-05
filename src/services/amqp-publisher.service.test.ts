import { configServiceMock } from '../../test/mocks';

import { AmqpPublisherService } from './amqp-publisher.service';

const amqpConnectionMock = jest.mocked({
  ...jest.requireActual('@golevelup/nestjs-rabbitmq'),
  publish: jest.fn(
    (name: string, routingKey: string, message: any, options?: object) => {
      if (message === 'throw error' && !name.endsWith('-dlq')) {
        throw new Error('test');
      }

      return {
        name,
        routingKey,
        message,
        options,
      };
    },
  ),
});

describe('AmqpPublisherService', () => {
  let amqpPublisherService: AmqpPublisherService;

  beforeEach(async () => {
    amqpPublisherService = new AmqpPublisherService(
      amqpConnectionMock,
      configServiceMock,
    );
  });

  describe('publish', () => {
    it('should publish a message', () => {
      const message = { a: 'b' };
      const options = { option: { key: 'value' } };

      amqpPublisherService.publish('testExchange', message, options);

      expect(amqpConnectionMock.publish).toHaveBeenCalledWith(
        'testExchange',
        'testRoutingKey',
        message,
        options,
      );
    });
  });
  describe('handle error', () => {
    it('should fail to handle publish message', async () => {
      const message = 'throw error';
      const options = { option: { key: 'value' } };

      await expect(
        amqpPublisherService.publish('testExchange', message, options),
      ).rejects.toThrow();

      expect(amqpConnectionMock.publish).toHaveBeenCalledWith(
        'testExchange',
        'testRoutingKey',
        message,
        options,
      );
    });
  });
});
