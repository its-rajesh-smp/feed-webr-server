import { WorkspaceService } from '@modules/workspace/workspace.service';
import { Resolver, Query, Args } from '@nestjs/graphql';

@Resolver('ReviewForm')
export class ReviewFormResolver {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Query('getReviewForm')
  async getReviewForm(@Args('accessUrl') accessUrl: String) {
    const workspace = await this.workspaceService.findOne({ accessUrl });
    return workspace;
  }
}
