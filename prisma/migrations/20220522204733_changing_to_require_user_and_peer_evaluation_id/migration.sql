/*
  Warnings:

  - Made the column `userId` on table `PeerEvaluationStudent` required. This step will fail if there are existing NULL values in that column.
  - Made the column `peerEvaluationId` on table `PeerEvaluationStudent` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "PeerEvaluationStudent" DROP CONSTRAINT "PeerEvaluationStudent_peerEvaluationId_fkey";

-- DropForeignKey
ALTER TABLE "PeerEvaluationStudent" DROP CONSTRAINT "PeerEvaluationStudent_userId_fkey";

-- AlterTable
ALTER TABLE "PeerEvaluationStudent" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "peerEvaluationId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "PeerEvaluationStudent" ADD CONSTRAINT "PeerEvaluationStudent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PeerEvaluationStudent" ADD CONSTRAINT "PeerEvaluationStudent_peerEvaluationId_fkey" FOREIGN KEY ("peerEvaluationId") REFERENCES "PeerEvaluation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
