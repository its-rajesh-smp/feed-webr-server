import { JwtService } from '@nestjs/jwt';
import { WorkspaceResolver } from './workspace.resolver';
import { WorkspaceService } from './workspace.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { AuthService } from '@modules/auth/auth.service';

@Module({
  imports: [],
  controllers: [],
  providers: [WorkspaceResolver, WorkspaceService, JwtService, AuthService],
})
export class WorkspaceModule {}
