/*
  Warnings:

  - You are about to drop the column `moduleId` on the `Email` table. All the data in the column will be lost.
  - You are about to drop the column `comment` on the `PeerEvaluation` table. All the data in the column will be lost.
  - You are about to drop the column `isCompleted` on the `PeerEvaluation` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `PeerEvaluation` table. All the data in the column will be lost.
  - You are about to drop the column `moduleId` on the `PeerEvaluationColumn` table. All the data in the column will be lost.
  - You are about to drop the column `peerEvaluationId` on the `PeerEvaluationReviewee` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `PeerEvaluationReviewee` table. All the data in the column will be lost.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Module` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ModuleTeachingMember` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Student` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentTeam` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[peerEvaluationId]` on the table `Email` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `PeerEvaluation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,peerEvaluationId]` on the table `PeerEvaluationColumn` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `PeerEvaluation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `PeerEvaluation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `peerEvaluationId` to the `PeerEvaluationColumn` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentReviewedId` to the `PeerEvaluationReviewee` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRoles" AS ENUM ('ADMIN', 'LECTURER', 'STUDENT');

-- CreateEnum
CREATE TYPE "PeerEvaluationStatuses" AS ENUM ('DRAFT', 'PUBLISHED', 'UNPUBLISHED', 'SUBMISSIONS_LOCKED');

-- CreateEnum
CREATE TYPE "PeerEvaluationTeachingMemberRoles" AS ENUM ('OWNER', 'EDITOR', 'VIEWER');

-- DropForeignKey
ALTER TABLE "Email" DROP CONSTRAINT "Email_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "ModuleTeachingMember" DROP CONSTRAINT "ModuleTeachingMember_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "ModuleTeachingMember" DROP CONSTRAINT "ModuleTeachingMember_userId_fkey";

-- DropForeignKey
ALTER TABLE "PeerEvaluation" DROP CONSTRAINT "PeerEvaluation_studentId_fkey";

-- DropForeignKey
ALTER TABLE "PeerEvaluationColumn" DROP CONSTRAINT "PeerEvaluationColumn_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "PeerEvaluationReviewee" DROP CONSTRAINT "PeerEvaluationReviewee_peerEvaluationId_fkey";

-- DropForeignKey
ALTER TABLE "PeerEvaluationReviewee" DROP CONSTRAINT "PeerEvaluationReviewee_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_moduleTeachingMemberId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_studentTeamId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_userId_fkey";

-- DropIndex
DROP INDEX "Email_moduleId_key";

-- DropIndex
DROP INDEX "PeerEvaluation_studentId_key";

-- DropIndex
DROP INDEX "PeerEvaluationColumn_id_moduleId_key";

-- AlterTable
ALTER TABLE "Email" DROP COLUMN "moduleId",
ADD COLUMN     "peerEvaluationId" TEXT;

-- AlterTable
ALTER TABLE "PeerEvaluation" DROP COLUMN "comment",
DROP COLUMN "isCompleted",
DROP COLUMN "studentId",
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "criteriaScoreRangeMax" INTEGER NOT NULL DEFAULT 5,
ADD COLUMN     "criteriaScoreRangeMin" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "maxGradeDecrease" INTEGER NOT NULL DEFAULT 100,
ADD COLUMN     "maxGradeIncrease" INTEGER NOT NULL DEFAULT 10,
ADD COLUMN     "schools" "Schools"[],
ADD COLUMN     "status" "PeerEvaluationStatuses" NOT NULL DEFAULT E'DRAFT',
ADD COLUMN     "submissionsLockDate" TIMESTAMP(3),
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PeerEvaluationColumn" DROP COLUMN "moduleId",
ADD COLUMN     "peerEvaluationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PeerEvaluationReviewee" DROP COLUMN "peerEvaluationId",
DROP COLUMN "studentId",
ADD COLUMN     "peerEvaluationReviewId" TEXT,
ADD COLUMN     "studentReviewedId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "UserRoles" NOT NULL DEFAULT E'STUDENT';

-- DropTable
DROP TABLE "Module";

-- DropTable
DROP TABLE "ModuleTeachingMember";

-- DropTable
DROP TABLE "Student";

-- DropTable
DROP TABLE "StudentTeam";

-- DropEnum
DROP TYPE "ModuleStatus";

-- DropEnum
DROP TYPE "ModuleTeachingMemberRoles";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "PeerEvaluationStudent" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    "peerEvaluationId" TEXT,
    "peerEvaluationStudentTeamId" TEXT,
    "averageCriteriaScore" DECIMAL(65,30),
    "averageCriteriaScoreByTeamMember" DECIMAL(65,30),
    "systemCalculatedMark" DECIMAL(65,30),
    "systemAdjustedMark" DECIMAL(65,30),
    "lecturerAdjustedMark" DECIMAL(65,30),
    "lecturerAdjustedMarkByUserId" TEXT,

    CONSTRAINT "PeerEvaluationStudent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PeerEvaluationStudentReview" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "peerEvaluationStudentId" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL,

    CONSTRAINT "PeerEvaluationStudentReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PeerEvaluationStudentTeam" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "mark" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "PeerEvaluationStudentTeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PeerEvaluationTeachingMember" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "PeerEvaluationTeachingMemberRoles" NOT NULL DEFAULT E'VIEWER',
    "peerEvaluationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "PeerEvaluationTeachingMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PeerEvaluationStudent_userId_peerEvaluationId_key" ON "PeerEvaluationStudent"("userId", "peerEvaluationId");

-- CreateIndex
CREATE UNIQUE INDEX "PeerEvaluationStudentReview_peerEvaluationStudentId_key" ON "PeerEvaluationStudentReview"("peerEvaluationStudentId");

-- CreateIndex
CREATE UNIQUE INDEX "PeerEvaluationTeachingMember_userId_peerEvaluationId_key" ON "PeerEvaluationTeachingMember"("userId", "peerEvaluationId");

-- CreateIndex
CREATE UNIQUE INDEX "Email_peerEvaluationId_key" ON "Email"("peerEvaluationId");

-- CreateIndex
CREATE UNIQUE INDEX "PeerEvaluation_code_key" ON "PeerEvaluation"("code");

-- CreateIndex
CREATE UNIQUE INDEX "PeerEvaluationColumn_id_peerEvaluationId_key" ON "PeerEvaluationColumn"("id", "peerEvaluationId");

-- AddForeignKey
ALTER TABLE "PeerEvaluationStudent" ADD CONSTRAINT "PeerEvaluationStudent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PeerEvaluationStudent" ADD CONSTRAINT "PeerEvaluationStudent_peerEvaluationId_fkey" FOREIGN KEY ("peerEvaluationId") REFERENCES "PeerEvaluation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PeerEvaluationStudent" ADD CONSTRAINT "PeerEvaluationStudent_peerEvaluationStudentTeamId_fkey" FOREIGN KEY ("peerEvaluationStudentTeamId") REFERENCES "PeerEvaluationStudentTeam"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PeerEvaluationStudent" ADD CONSTRAINT "PeerEvaluationStudent_lecturerAdjustedMarkByUserId_fkey" FOREIGN KEY ("lecturerAdjustedMarkByUserId") REFERENCES "PeerEvaluationTeachingMember"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PeerEvaluationStudentReview" ADD CONSTRAINT "PeerEvaluationStudentReview_peerEvaluationStudentId_fkey" FOREIGN KEY ("peerEvaluationStudentId") REFERENCES "PeerEvaluationStudent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PeerEvaluationReviewee" ADD CONSTRAINT "PeerEvaluationReviewee_studentReviewedId_fkey" FOREIGN KEY ("studentReviewedId") REFERENCES "PeerEvaluationStudent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PeerEvaluationReviewee" ADD CONSTRAINT "PeerEvaluationReviewee_peerEvaluationReviewId_fkey" FOREIGN KEY ("peerEvaluationReviewId") REFERENCES "PeerEvaluationStudentReview"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PeerEvaluationTeachingMember" ADD CONSTRAINT "PeerEvaluationTeachingMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PeerEvaluationTeachingMember" ADD CONSTRAINT "PeerEvaluationTeachingMember_peerEvaluationId_fkey" FOREIGN KEY ("peerEvaluationId") REFERENCES "PeerEvaluation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PeerEvaluationColumn" ADD CONSTRAINT "PeerEvaluationColumn_peerEvaluationId_fkey" FOREIGN KEY ("peerEvaluationId") REFERENCES "PeerEvaluation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Email" ADD CONSTRAINT "Email_peerEvaluationId_fkey" FOREIGN KEY ("peerEvaluationId") REFERENCES "PeerEvaluation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
