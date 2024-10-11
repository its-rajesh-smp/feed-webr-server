import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  controllers: [],
  providers: [AuthService, AuthResolver, JwtService],
  exports: [],
})
export class AuthModule {}
