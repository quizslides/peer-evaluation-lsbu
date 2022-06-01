/*
  Warnings:

  - You are about to drop the column `maxGradeDecrease` on the `PeerEvaluation` table. All the data in the column will be lost.
  - You are about to drop the column `maxGradeIncrease` on the `PeerEvaluation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PeerEvaluation" DROP COLUMN "maxGradeDecrease",
DROP COLUMN "maxGradeIncrease",
ADD COLUMN     "maxMarkDecrease" INTEGER NOT NULL DEFAULT 100,
ADD COLUMN     "maxMarkIncrease" INTEGER NOT NULL DEFAULT 10;
