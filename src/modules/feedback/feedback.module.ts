import { Module } from '@nestjs/common';
import { FeedbackResolver } from './feedback.resolver';
import { WorkspaceService } from '@modules/workspace/workspace.service';

@Module({
  imports: [],
  controllers: [],
  providers: [FeedbackResolver, WorkspaceService],
})
export class FeedbackModule {}
