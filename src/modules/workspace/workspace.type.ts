import { Upload } from 'graphql-upload';

export interface IWorkspace {
  name: string;
  logoFile?: Promise<Upload> | null;
  logoUrl: string;
  title: string;
  customMessage: string;
  workspaceQuestions: IWorkspaceQuestion[];
}

export interface IWorkspaceQuestion {
  id: string;
  question: string;
  type: string;
  index: number;
}
