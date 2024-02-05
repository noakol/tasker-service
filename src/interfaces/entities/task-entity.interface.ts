import { Task } from '@app/constants/enums';

export interface ITaskEntity {
  uuid: string;
  params: (string | number)[];
  type: Task;
  value: string | number;
  createdAt: Date;
}
