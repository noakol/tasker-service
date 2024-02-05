import { Task } from '@app/constants/enums';

export interface INewTaskMessage {
  uuid: string;
  type: Task;
  params: (string | number)[];
}
