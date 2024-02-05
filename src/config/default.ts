export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  amqp: {
    connection: {
      port: 5672,
      protocol: 'amqp',
      hostname: 'localhost',
    },
    credentials: {
      username: process.env.AMQP_USERNAME || 'guest',
      password: process.env.AMQP_PASSWORD || 'guest',
    },
    queues: {
      TaskerIn: {
        name: 'tasker-in',
        routingKey: 'tasker.in',
        exchangeName: 'tasker-service-exchange',
        dlq: 'tasker-in-dlq',
      },
    },
    exchanges: {
      TaskerExchange: {
        name: 'tasker-service-exchange',
        routingKey: 'tasker.in',
        type: 'topic',
        dlx: 'tasker-service-dlx',
      },
    },
    channels: {
      'tasker-service': {
        prefetchCount: 30,
        default: true,
      },
    },
    maxRetries: 3,
    timeout: 2000,
  },
  typeorm: {
    type: 'mongodb',
    host: process.env.MONGO_HOST || 'localhost:27017',
    protocol: 'mongodb',
    database: 'tasks',
    username: process.env.MONGO_USERNAME || '',
    password: process.env.MONGO_PASSWORD || '',
    useUnifiedTopology: true,
    useNewUrlParser: true,
    entities: ['src/entities/*.entity{.ts,.js}'],
    migrations: ['migrations-js/*.js'],
    migrationsTableName: 'migrations',
    logging: false,
    cli: {
      entitiesDir: 'src/entities',
      migrationsDir: 'src/migrations',
    },
    extra: { max: 10 },
  },
});
