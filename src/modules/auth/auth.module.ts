import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  imports: [],
  controllers: [],
  providers: [AuthService, AuthResolver],
  exports: [],
})
export class AuthModule {}
