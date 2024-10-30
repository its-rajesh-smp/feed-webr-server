import { Module } from '@nestjs/common';
import { FeedbackResolver } from './feedback.resolver';
import { WorkspaceService } from '@modules/workspace/workspace.service';
import { FeedbackService } from './feedback.service';

@Module({
  imports: [],
  controllers: [],
  providers: [FeedbackResolver, WorkspaceService, FeedbackService],
})
export class FeedbackModule {}
