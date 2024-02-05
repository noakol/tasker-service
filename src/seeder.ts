// import { TypeOrmModule } from '@nestjs/typeorm';
// import * as entities from '@app/entities';
// import { getMongoDBConnectionString } from '@app/setup-checklist/utils';
// import { ConfigModule, LushaConfigService } from '@lusha/config-nestjs';
// import { seeder } from 'nestjs-seeder';
//
// import * as seeders from './seeders';
//
// seeder({
//   imports: [
//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule],
//       useFactory: async (configService: LushaConfigService) => (
//         {
//           ...configService.getValue('typeorm'),
//           url: getMongoDBConnectionString(configService.getValue('typeorm')),
//           entities,
//           synchronize: false, // must be DISABLED on production!!!
//         }
//       ),
//       inject: [LushaConfigService],
//
//     }),
//     TypeOrmModule.forFeature(Object.values(entities)),
//   ],
//
// }).run(Object.values(seeders));
