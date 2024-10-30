import { WorkspaceService } from '@modules/workspace/workspace.service';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { generateFeedbackQuestionResponseRows } from './feedback.util';
import { FeedbackService } from './feedback.service';

@Resolver('Feedback')
export class FeedbackResolver {
  constructor(
    private readonly workspaceService: WorkspaceService,
    private readonly feedbackService: FeedbackService,
  ) {}

  @Query('getFeedbackForm')
  async getFeedbackForm(@Args('accessUrl') accessUrl: String) {
    const workspace = await this.workspaceService.findOne({ accessUrl });
    return workspace;
  }

  @Mutation('submitFeedbackForm')
  async submitFeedbackForm(@Args('feedbackInput') feedbackInput: any) {
    const { accessUrl, questionResponses } = feedbackInput;

    // find workspace by accessUrl
    const workspace = await this.workspaceService.findUnique({ accessUrl });

    // if workspace not found, throw error
    if (!workspace) {
      throw new Error('Workspace not found');
    }

    // generate rows to insert
    const rowsToInsert = generateFeedbackQuestionResponseRows(
      workspace.workspaceQuestions,
      questionResponses,
      workspace.userId,
    );

    // create feedback with questionResponses
    const feedback = await this.feedbackService.create({
      workspaceId: workspace.id,
      ownerId: workspace.userId,
      QuestionResponse: { createMany: { data: rowsToInsert } },
    });

    return true;
  }
}
