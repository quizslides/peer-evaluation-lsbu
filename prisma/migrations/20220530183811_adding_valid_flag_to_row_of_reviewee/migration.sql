/*
  Warnings:

  - You are about to drop the column `isInvalid` on the `PeerEvaluationRevieweeColumn` table. All the data in the column will be lost.
  - Added the required column `isInvalid` to the `PeerEvaluationReviewee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PeerEvaluationReviewee" ADD COLUMN     "isInvalid" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "PeerEvaluationRevieweeColumn" DROP COLUMN "isInvalid";
