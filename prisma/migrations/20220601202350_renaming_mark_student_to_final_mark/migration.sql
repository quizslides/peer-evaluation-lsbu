/*
  Warnings:

  - You are about to drop the column `mark` on the `PeerEvaluationStudent` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PeerEvaluationStudent" DROP COLUMN "mark",
ADD COLUMN     "finalMark" DECIMAL(65,30);
