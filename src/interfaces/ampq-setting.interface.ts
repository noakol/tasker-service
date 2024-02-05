export interface IAmqpSettings {
  connection: IConnection;
  credentials: ICredentials;
  queues: IQueues;
  exchanges: IExchanges;
  channels: IChannels;
  maxRetries: number;
  timeout: number;
}

interface IConnection {
  port: number;
  protocol: string;
  hostname: string;
}

interface ICredentials {
  username: string;
  password: string;
}

export interface IQueues {
  [queueName: string]: IQueue;
}

export interface IQueue {
  name: string;
  routingKey: string;
  exchangeName: string;
}

interface IExchanges {
  default: IExchange;
  [exchangeName: string]: IExchange;
}

interface IExchange {
  name: string;
  type: string;
  routingKey?: string;
}

interface IChannels {
  [channelName: string]: IChannel;
}

export interface IChannel {
  prefetchCount: number;
  default: boolean;
}
