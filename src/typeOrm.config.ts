// /* typeorm configs for generating migrations and running them */
// import { getMongoDBConnectionString } from '@app/setup-checklist/utils';
// import config from 'config';
// import { DataSource } from 'typeorm';
// import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';
//
// const mongoDBConnection: MongoConnectionOptions = {
//   ...config.get('typeorm'),
//   url: getMongoDBConnectionString(config.get('typeorm')),
// };
//
// export default new DataSource(mongoDBConnection);
