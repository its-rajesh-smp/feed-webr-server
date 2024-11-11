-- CreateTable
CREATE TABLE "UserAttachment" (
    "id" TEXT NOT NULL,
    "resourceType" TEXT NOT NULL DEFAULT 'other',
    "url" TEXT NOT NULL,
    "asset_id" TEXT NOT NULL,
    "feedbackId" TEXT NOT NULL,

    CONSTRAINT "UserAttachment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAttachment_asset_id_key" ON "UserAttachment"("asset_id");

-- AddForeignKey
ALTER TABLE "UserAttachment" ADD CONSTRAINT "UserAttachment_feedbackId_fkey" FOREIGN KEY ("feedbackId") REFERENCES "Feedback"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
