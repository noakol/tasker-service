import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { validate } from 'class-validator';
import { mapKeys } from 'lodash';
import { Observable } from 'rxjs';
import { AvailableQueues } from '@app/constants/enums';
import { NewTaskEventDto } from '@app/dtos/new-task-event.dto';

@Injectable()
export class MessageValidationInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const dtoInstance = this.reflector.get<string>(
      'message',
      context.getHandler(),
    );

    const instance = this.messageQueueFactory(dtoInstance as AvailableQueues);

    mapKeys(request, (value: any, key: any) => {
      instance[key] = value;
    });

    const errors = await validate(instance);

    if (errors.length > 0) {
      request.invalidSchema = true;
      request.schemaErrors = errors;
      request.schemaErrors.push({ instance: dtoInstance });
    }

    return next.handle();
  }

  private messageQueueFactory(eventQueue: AvailableQueues) {
    switch (eventQueue) {
      case AvailableQueues.TaskerIn:
        return new NewTaskEventDto();
      default:
        return {};
    }
  }
}
