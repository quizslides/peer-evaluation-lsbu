/*
  Warnings:

  - Added the required column `studentName` to the `PeerEvaluationStudent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PeerEvaluationStudent" ADD COLUMN     "studentName" TEXT NOT NULL;
