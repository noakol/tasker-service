import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { TaskerController } from './web-server/controllers/tasker.controller';
import config from './config/default';
import { ConfigService } from '@nestjs/config';
import { AmqpPublisherService } from '@app/services/amqp-publisher.service';
import * as consumers from 'src/web-server/consumers';
import * as entities from '@app/entities';
import { TasksRepository } from '@app/repositories/tasks.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const amqpConfig = configService.get<any>('amqp');

        return {
          exchanges: Object.values(amqpConfig.exchanges),
          uri: `${amqpConfig.connection.protocol}://${amqpConfig.credentials.username}:${amqpConfig.credentials.password}@${amqpConfig.connection.hostname}:${amqpConfig.connection.port}`,
          connectionInitOptions: {
            timeout: amqpConfig.timeout,
          },
          channels: amqpConfig.channels,
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const { protocol, username, password, host, database } =
          configService.get('typeorm');
        return {
          ...configService.get('typeorm'),
          url: `${protocol}://${username}:${password}@${host}/${database}`,
          entities,
          synchronize: false, // must be DISABLED on production!!!
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature(Object.values(entities)),
  ],
  controllers: [TaskerController],
  providers: [
    AmqpPublisherService,
    ConfigService,
    ...Object.values(entities),
    TasksRepository,
    ...Object.values(consumers),
  ],
})
export class AppModule {}
