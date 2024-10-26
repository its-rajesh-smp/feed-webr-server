import { User } from '@common/decorators/user.decorator';
import { uploadFile } from '@common/utils/cloudinary.util';
import { AuthGuard } from '@modules/auth/guards/AuthGuard';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { WorkspaceService } from './workspace.service';
import { IWorkspace, IWorkspaceQuestion } from './workspace.type';

@Resolver('Workspace')
export class WorkspaceResolver {
  constructor(private readonly workspaceService: WorkspaceService) {}

  /**
   * Get workspace of a user
   */
  @UseGuards(AuthGuard)
  @Query('getAllWorkspaces')
  async getAllWorkspaces(@User() user, @Args('name') name) {
    const condition = {};

    // filter by name
    if (name) {
      condition['name'] = {
        contains: name,
      };
    }

    return await this.workspaceService.findAll(condition);
  }

  /**
   * Get a workspace of a user
   */
  @UseGuards(AuthGuard)
  @Query('getAWorkspace')
  async getAWorkspace(@User() user, @Args('id') id: string) {
    return await this.workspaceService.findOneById(id);
  }

  /**
   * Creates a new workspace
   * @param workspaceInput
   * @returns
   */
  @UseGuards(AuthGuard)
  @Mutation('createWorkspace')
  async createWorkspace(
    @User() user,
    @Args('workspaceInput') workspaceInput: IWorkspace,
  ) {
    let uploadedLogoResponse = null;
    if (workspaceInput.logoFile) {
      const { file } = await workspaceInput.logoFile;
      uploadedLogoResponse = await uploadFile(file);
    }

    // remove logoFile from workspaceInput
    delete workspaceInput.logoFile;

    // create workspace with logoUrl, accessUrl and questions
    const workspace = await this.workspaceService.create({
      ...workspaceInput,
      logoUrl: uploadedLogoResponse?.secure_url,
      userId: user.id,
      workspaceQuestions: {
        create: workspaceInput.workspaceQuestions.map(
          (question: IWorkspaceQuestion) => ({
            ...question,
            userId: user.id,
          }),
        ),
      },
    });

    return workspace;
  }
}
