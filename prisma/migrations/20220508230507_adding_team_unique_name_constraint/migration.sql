/*
  Warnings:

  - A unique constraint covering the columns `[name,peerEvaluationId]` on the table `PeerEvaluationStudentTeam` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "PeerEvaluationStudentTeam" ADD COLUMN     "peerEvaluationId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "PeerEvaluationStudentTeam_name_peerEvaluationId_key" ON "PeerEvaluationStudentTeam"("name", "peerEvaluationId");

-- AddForeignKey
ALTER TABLE "PeerEvaluationStudentTeam" ADD CONSTRAINT "PeerEvaluationStudentTeam_peerEvaluationId_fkey" FOREIGN KEY ("peerEvaluationId") REFERENCES "PeerEvaluation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
