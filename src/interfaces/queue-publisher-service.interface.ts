export interface IQueuePublisherService {
  publish<T>(exchangeKey: string, message: T, options?: object): Promise<void>
}
