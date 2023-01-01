import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from './prisma/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { join } from 'path';

import { PostModule } from './post/post.module';
import { StudentModule } from './student/student.module';
import { RedisCacheModule } from './redis/redis.module';

@Module({
  imports: [
    PrismaModule.forRoot({
      prismaServiceOptions: {
        prismaOptions: {
          log: ['query'],
        },
      },
      isGlobal: true,
    }),
    PostModule,
    StudentModule,
    RedisCacheModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      subscriptions: {
        'graphql-ws': true,
      },
      buildSchemaOptions: {
        numberScalarMode: 'integer',
        dateScalarMode: 'isoDate',
      },
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ extra, req, connectionParams }) => {
        return req ? { req } : { req: extra.request, connectionParams };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
