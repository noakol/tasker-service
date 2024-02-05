import { INewTaskMessage } from '@app/interfaces/new-task.interface';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { CreateTaskDto } from '@app/dtos/create-task.dto';

export class NewTaskEventDto extends CreateTaskDto implements INewTaskMessage {
  @IsUUID()
  @IsNotEmpty()
  uuid: string;

  @IsOptional()
  invalidSchema?: boolean;

  @IsOptional()
  schemaErrors?: string[];
}
