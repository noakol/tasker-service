import { IsArray, IsString, IsEnum } from 'class-validator';
import { IsArrayOfStringsOrNumbers } from './utils';
import { Task } from '../constants/enums';

export class CreateTaskDto {
  @IsString()
  @IsEnum(Task)
  readonly type: Task;

  @IsArray()
  @IsArrayOfStringsOrNumbers()
  readonly params: (string | number)[];
}
