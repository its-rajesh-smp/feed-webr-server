import { User } from '@common/decorators/user.decorator';
import { uploadMultipleFiles } from '@common/utils/cloudinary.util';
import { AuthGuard } from '@modules/auth/guards/AuthGuard';
import { WorkspaceService } from '@modules/workspace/workspace.service';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FeedbackService } from './feedback.service';
import {
  generateAttachmentRows,
  generateFeedbackQuestionResponseRows,
} from './feedback.util';

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
    //  TODO: validate feedbackInput
    const { accessUrl, questionResponses } = feedbackInput;

    // find workspace by accessUrl
    const workspace = await this.workspaceService.findUnique({ accessUrl });

    // if workspace not found, throw error
    if (!workspace) {
      throw new Error('Workspace not found');
    }

    // generate rows to insert
    const questionResponseRowsToInsert = generateFeedbackQuestionResponseRows(
      workspace.workspaceQuestions,
      questionResponses,
      workspace.userId,
    );

    const raw_attachments = await Promise.all(feedbackInput.attachments);
    const files = raw_attachments.map((file) => file.file);
    const results: any = await uploadMultipleFiles(files, 'test');

    const attachmentRowsToInsert = generateAttachmentRows(
      results,
      workspace.userId,
    );

    // create feedback with questionResponses
    const feedback = await this.feedbackService.create({
      workspaceId: workspace.id,
      ownerId: workspace.userId,
      QuestionResponse: { createMany: { data: questionResponseRowsToInsert } },
      UserAttachment: { createMany: { data: attachmentRowsToInsert } },
    });

    return true;
  }

  @UseGuards(AuthGuard)
  @Query('getFeedbackResponses')
  async getFeedbackResponses(
    @User() user,
    @Args('getFeedbackInput') getFeedbackInput: any,
  ) {
    const { workspaceId, inboxType } = getFeedbackInput;

    const workspace = await this.workspaceService.findUnique({
      id: workspaceId,
      userId: user.id,
    });

    if (!workspace) {
      throw new Error('Workspace not found');
    }

    let feedbacks = [];

    switch (inboxType) {
      case 'all':
        feedbacks = await this.feedbackService.findAll({
          workspaceId,
        });
        break;
      case 'texts':
        feedbacks = await this.feedbackService.findAll({
          workspaceId,
          UserAttachment: { none: {} },
        });
        break;
      case 'attachments':
        feedbacks = await this.feedbackService.findAll({
          workspaceId,
          UserAttachment: { some: {} },
        });
        break;
    }
    console.log(feedbacks);
    return feedbacks;
  }
}
