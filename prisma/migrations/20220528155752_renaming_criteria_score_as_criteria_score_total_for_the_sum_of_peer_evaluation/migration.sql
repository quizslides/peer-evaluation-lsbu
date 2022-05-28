/*
  Warnings:

  - You are about to drop the column `criteriaScore` on the `PeerEvaluationReviewee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PeerEvaluationReviewee" DROP COLUMN "criteriaScore",
ADD COLUMN     "criteriaScoreTotal" INTEGER;
