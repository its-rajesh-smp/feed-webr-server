import { getEnv } from '@common/utils/env.util';
import { PrismaModule } from './../prisma/prisma.module';
import { AuthModule } from '@modules/auth/auth.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}