import { uploadFile } from '@common/utils/cloudinary.util';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Upload } from 'graphql-upload';

@Resolver('Workspace')
export class WorkspaceResolver {
  constructor() {}

  @Mutation('createWorkspace')
  async createWorkspace(
    @Args('workspaceInput') workspaceInput: { logoFile: Promise<Upload> },
  ) {
    const { file } = await workspaceInput.logoFile;
    const res = await uploadFile(file);

    return {
      logoUrl: res.secure_url,
      ...workspaceInput,
    };
  }
}
