/*
  Warnings:

  - You are about to drop the column `isInvalid` on the `PeerEvaluationReviewee` table. All the data in the column will be lost.
  - Added the required column `isValid` to the `PeerEvaluationReviewee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PeerEvaluationReviewee" DROP COLUMN "isInvalid",
ADD COLUMN     "isValid" BOOLEAN NOT NULL;
