import { WorkspaceResolver } from './workspace.resolver';
import { WorkspaceService } from './workspace.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
  providers: [WorkspaceResolver, WorkspaceService],
})
export class WorkspaceModule {}
