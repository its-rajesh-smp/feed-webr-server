import { WorkspaceService } from '@modules/workspace/workspace.service';
import { Module } from '@nestjs/common';
import { FeedbackResolver } from './feedback.resolver';
import { FeedbackService } from './feedback.service';
import { AuthService } from '@modules/auth/auth.service';

@Module({
  imports: [],
  controllers: [],
  providers: [FeedbackResolver, WorkspaceService, FeedbackService, AuthService],
})
export class FeedbackModule {}
