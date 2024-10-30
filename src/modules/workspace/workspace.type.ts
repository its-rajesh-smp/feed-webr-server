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
  type: QuestionType;
  index: number;
  isMandatory: boolean;
  isRequired: boolean;
}

export enum QuestionType {
  SHORT_TEXT = 'SHORT_TEXT',
  NUMBER = 'NUMBER',
  EMAIL = 'EMAIL',
  SELECT = 'SELECT',
  CHECKBOX = 'CHECKBOX',
}
