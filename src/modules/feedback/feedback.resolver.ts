import { WorkspaceService } from '@modules/workspace/workspace.service';
import { Resolver, Query, Args } from '@nestjs/graphql';

@Resolver('Feedback')
export class FeedbackResolver {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Query('getFeedbackForm')
  async getFeedbackForm(@Args('accessUrl') accessUrl: String) {
    const workspace = await this.workspaceService.findOne({ accessUrl });
    return workspace;
  }
}
