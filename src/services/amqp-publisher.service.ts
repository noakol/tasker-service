import { Injectable } from '@nestjs/common';
import { IAmqpSettings, IQueuePublisherService } from '@app/interfaces';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AmqpPublisherService implements IQueuePublisherService {
  private amqpSettings: IAmqpSettings;

  constructor(
    private amqpConnection: AmqpConnection,
    private config: ConfigService,
  ) {
    this.amqpSettings = this.config.get<IAmqpSettings>('amqp');
  }

  async publish<T>(
    exchangeKey: string,
    message: T,
    options?: object,
  ): Promise<void> {
    const { name, routingKey } = this.amqpSettings.exchanges[exchangeKey];

    try {
      await this.amqpConnection.publish(name, routingKey, message, options);
    } catch (err) {
      throw err;
    }
  }
}
