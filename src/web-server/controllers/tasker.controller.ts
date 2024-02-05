import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Get,
  Param,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from '@app/dtos';
import { AmqpPublisherService } from '@app/services/amqp-publisher.service';
import { INewTaskMessage } from '@app/interfaces';
import { AvailableExchanges, Task } from '@app/constants/enums';
import { TasksRepository } from '@app/repositories/tasks.repository';

@Controller('api/v1/tasker')
export class TaskerController {
  constructor(
    private readonly amqpPublisher: AmqpPublisherService,
    private readonly tasksRepository: TasksRepository,
  ) {}

  @Post('create')
  async create(@Body() inputDto: CreateTaskDto): Promise<object> {
    if (
      (inputDto.type === Task.Concat &&
        typeof inputDto.params[0] === 'number') ||
      (inputDto.type === Task.Sum && typeof inputDto.params[0] === 'string')
    ) {
      throw new HttpException(
        'params type is not matching the task',
        HttpStatus.BAD_REQUEST,
      );
    }

    const uuid = uuidv4();

    await this.amqpPublisher.publish<INewTaskMessage>(
      AvailableExchanges.TaskerExchange,
      {
        uuid,
        ...inputDto,
      } as INewTaskMessage,
    );

    //TODO: make generic middleware controller response
    return { data: { uuid } };
  }

  @Get('/:uuid')
  async getByUUID(@Param() inputGetDto: { uuid: string }): Promise<object> {
    try {
      const res = await this.tasksRepository.getById(inputGetDto.uuid);
      return { data: { value: res.value } };
    } catch (error) {
      throw new HttpException(
        'No value found for the uuid',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
