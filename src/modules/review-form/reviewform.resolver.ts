import { WorkspaceService } from '@modules/workspace/workspace.service';
import { Resolver, Query, Args } from '@nestjs/graphql';

@Resolver('ReviewForm')
export class ReviewFormResolver {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Query('getReviewForm')
  async getReviewForm(@Args('accessUrl') accessUrl: String) {
    console.log(accessUrl);
    const workspace = await this.workspaceService.findOne({ accessUrl });
    console.log(workspace);
    return workspace;
  }
}
