/*
  Warnings:

  - You are about to drop the column `lecturerAdjustedMarkByUserId` on the `PeerEvaluationStudent` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PeerEvaluationStudent" DROP CONSTRAINT "PeerEvaluationStudent_lecturerAdjustedMarkByUserId_fkey";

-- AlterTable
ALTER TABLE "PeerEvaluationReviewee" ALTER COLUMN "criteriaScore" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PeerEvaluationRevieweeColumn" ALTER COLUMN "criteriaScore" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PeerEvaluationStudent" DROP COLUMN "lecturerAdjustedMarkByUserId";
