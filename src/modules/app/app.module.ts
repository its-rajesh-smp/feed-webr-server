import { ReviewFormModule } from './../review-form/reviewform.module';
import { WorkspaceModule } from './../workspace/workspace.module';
import { getEnv } from '@common/utils/env.util';
import { PrismaModule } from './../prisma/prisma.module';
import { AuthModule } from '@modules/auth/auth.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ReviewFormModule,
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
  ],
  controllers: [],
})
export class AppModule {}
