-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionResponse" (
    "id" TEXT NOT NULL,
    "answer" JSONB NOT NULL,
    "ownerId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "feedbackId" TEXT NOT NULL,

    CONSTRAINT "QuestionResponse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionResponse" ADD CONSTRAINT "QuestionResponse_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionResponse" ADD CONSTRAINT "QuestionResponse_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "WorkspaceQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionResponse" ADD CONSTRAINT "QuestionResponse_feedbackId_fkey" FOREIGN KEY ("feedbackId") REFERENCES "Feedback"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
