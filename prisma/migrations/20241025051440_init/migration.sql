-- AlterTable
ALTER TABLE "WorkspaceQuestion" ADD COLUMN     "isMandatory" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isRequired" BOOLEAN NOT NULL DEFAULT false;
