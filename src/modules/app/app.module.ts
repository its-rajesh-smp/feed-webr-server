import { getEnv } from '@common/utils/env.util';
import { AuthModule } from '@modules/auth/auth.module';
import { UserAttachmentModule } from '@modules/user-attachment/user-attachment.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';
import { FeedbackModule } from '../feedback/feedback.module';
import { PrismaModule } from './../prisma/prisma.module';
import { WorkspaceModule } from './../workspace/workspace.module';

@Module({
  imports: [
    FeedbackModule,
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: getEnv('JWT_SECRET'),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.gql'],
    }),
    AuthModule,
    WorkspaceModule,
    UserAttachmentModule,
  ],
  controllers: [],
})
export class AppModule {}
