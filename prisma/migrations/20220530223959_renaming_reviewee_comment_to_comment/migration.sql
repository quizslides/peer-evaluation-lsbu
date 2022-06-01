/*
  Warnings:

  - You are about to drop the column `revieweeComment` on the `PeerEvaluationReviewee` table. All the data in the column will be lost.
  - Added the required column `comment` to the `PeerEvaluationReviewee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PeerEvaluationReviewee" DROP COLUMN "revieweeComment",
ADD COLUMN     "comment" TEXT NOT NULL;
