import { Module } from '@nestjs/common';
import { ReviewFormResolver } from './reviewform.resolver';
import { WorkspaceService } from '@modules/workspace/workspace.service';

@Module({
  imports: [],
  controllers: [],
  providers: [ReviewFormResolver, WorkspaceService],
})
export class ReviewFormModule {}
