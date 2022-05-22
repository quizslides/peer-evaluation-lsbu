/*
  Warnings:

  - Made the column `peerEvaluationId` on table `PeerEvaluationStudentTeam` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "PeerEvaluationStudentTeam" DROP CONSTRAINT "PeerEvaluationStudentTeam_peerEvaluationId_fkey";

-- AlterTable
ALTER TABLE "PeerEvaluationStudentTeam" ALTER COLUMN "peerEvaluationId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "PeerEvaluationStudentTeam" ADD CONSTRAINT "PeerEvaluationStudentTeam_peerEvaluationId_fkey" FOREIGN KEY ("peerEvaluationId") REFERENCES "PeerEvaluation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
