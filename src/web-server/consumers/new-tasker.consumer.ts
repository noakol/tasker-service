import { Injectable, SetMetadata, UseInterceptors } from '@nestjs/common';
import { RabbitSubscribe, SubscribeResponse, Nack } from '@golevelup/nestjs-rabbitmq';
import { RabbitMqConfigurationsHelper } from '@app/helpers/rabbit-queue-configurations';
import { IConsumer } from '@app/interfaces/consumer.interface';
import { NewTaskEventDto } from '@app/dtos/new-task-event.dto';
import { AvailableQueues, Task } from '@app/constants/enums';
import { concatStr, calculateSum } from '@app/helpers/tasks-calculation';
import { TasksRepository } from '@app/repositories/tasks.repository';
import { MessageValidationInterceptor } from '@app/common/interseptors/message-validation-interceptor';
import { Logger } from '@nestjs/common';

@Injectable()
export class NewTaskConsumer implements IConsumer<any> {
  private readonly logger = new Logger();

  constructor(private readonly tasksRepository: TasksRepository) {}

  // TODO: publish message to dlq when fail to handle
  @RabbitSubscribe(
    RabbitMqConfigurationsHelper.getQueueConfiguration(
      AvailableQueues.TaskerIn,
    ),
  )
  @SetMetadata('message', AvailableQueues.TaskerIn)
  @UseInterceptors(MessageValidationInterceptor)
  async onMessage(event: NewTaskEventDto): Promise<SubscribeResponse> {
    if (event.invalidSchema) {
      this.logger.error(`schema validation error ${event.schemaErrors}`);

      return new Nack();
    }

    let res: any = undefined;

    switch (event.type) {
      case Task.Sum:
        res = calculateSum(event.params as number[]);
        break;
      case Task.Concat:
        res = concatStr(event.params as string[]);
        break;
      default:
        break;
    }

    if (res) {
      try {
        await this.tasksRepository.create({
          uuid: event.uuid,
          value: res,
          type: event.type,
          params: event.params,
        });
      } catch (error) {
        this.logger.error(`failed to save to task ${event.uuid} db`);

        return new Nack();
      }
    }

    return undefined;
  }
}
