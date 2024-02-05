import { Task, Collection } from '@app/constants/enums';
import {
  CreateDateColumn,
  Column,
  Index,
  Entity,
  Unique,
  PrimaryColumn,
  ObjectIdColumn,
} from 'typeorm';
import { ITaskEntity } from '@app/interfaces/entities/task-entity.interface';

@Entity({ name: Collection.Tasks })
@Unique(['uuid'])
export class TasksEntity implements ITaskEntity {
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column()
  type: Task;

  @Column()
  params: (string | number)[];

  @Column()
  value: string | number;

  @PrimaryColumn()
  @ObjectIdColumn()
  @Index()
  uuid: string;
}
