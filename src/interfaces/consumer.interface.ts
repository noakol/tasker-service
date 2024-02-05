import { SubscribeResponse } from '@golevelup/nestjs-rabbitmq';

export interface IConsumer<T> {
  onMessage(message: T): Promise<SubscribeResponse>;
  onDLQMessage?(message: T): Promise<SubscribeResponse>;
}
