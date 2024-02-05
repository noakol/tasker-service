import { RabbitHandlerConfig } from '@golevelup/nestjs-rabbitmq';
import { AvailableQueues } from '@app/constants/enums';
import config from '../config/default';

export class RabbitMqConfigurationsHelper {
  static getQueueConfiguration(
    queueName: AvailableQueues
  ): RabbitHandlerConfig {
    const queueConfig = config().amqp.queues?.[queueName];

    return {
      type: 'subscribe',
      exchange: queueConfig.exchangeName,
      routingKey: queueConfig.routingKey,
      queue: queueConfig.name,
      queueOptions: {
        durable: true,
        // deadLetterRoutingKey: queueConfig.dlq.routingKey,
      },
      createQueueIfNotExists: true,
    };
  }

  // static getDlqConfiguration(
  //   queueName: SetupChecklistQueues,
  // ): RabbitHandlerConfig {
  //   const queueConfig: IRabbitQueue = this.queues[queueName];
  //
  //   return {
  //     type: 'subscribe',
  //     exchange: this.exchanges.dlx?.name,
  //     routingKey: queueConfig.dlq.routingKey,
  //     queue: queueConfig.dlq.name,
  //     queueOptions: { durable: true },
  //     createQueueIfNotExists: true,
  //   };
  // }
}
