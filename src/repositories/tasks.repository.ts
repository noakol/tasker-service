import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';

import { TasksEntity } from '@app/entities';
import { ITaskEntity } from '@app/interfaces/entities/task-entity.interface';

@Injectable()
export class TasksRepository {
  constructor(
    @InjectRepository(TasksEntity)
    private tasksRepository: MongoRepository<TasksEntity>,
  ) {}

  /**
   * Retrieves task record from the database based on the provided uuid.
   *
   * @param uuid - The unique id to search by.
   * @returns A promise that resolves to an array of ITaskEntity object matching the uuid.
   */
  async getById(uuid: string): Promise<ITaskEntity> {
    return this.tasksRepository.findOne({
      where: { uuid },
    });
  }

  /**
   * Creates a new tasksEntity record in the database.
   *
   * @param task - An object implementing the ITaskEntity interface representing the data to be persisted.
   * @returns A promise that resolves to the created ITaskEntity.
   */
  async create(task: Partial<ITaskEntity>): Promise<ITaskEntity> {
    const tasksEntity: TasksEntity = this.tasksRepository.create(task);

    return this.tasksRepository.save(tasksEntity);
  }
}
