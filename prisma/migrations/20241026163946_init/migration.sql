/*
  Warnings:

  - A unique constraint covering the columns `[accessUrl]` on the table `Workspace` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Workspace_accessUrl_key" ON "Workspace"("accessUrl");
