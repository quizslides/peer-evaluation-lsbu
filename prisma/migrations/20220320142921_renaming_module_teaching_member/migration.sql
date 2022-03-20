/*
  Warnings:

  - You are about to drop the column `moduleMemberId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the `ModuleMember` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ModuleTeachingMemberRoles" AS ENUM ('OWNER', 'EDITOR', 'VIEWER');

-- DropForeignKey
ALTER TABLE "ModuleMember" DROP CONSTRAINT "ModuleMember_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "ModuleMember" DROP CONSTRAINT "ModuleMember_userId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_moduleMemberId_fkey";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "moduleMemberId",
ADD COLUMN     "moduleTeachingMemberId" TEXT;

-- DropTable
DROP TABLE "ModuleMember";

-- DropEnum
DROP TYPE "ModuleMemberPermissions";

-- CreateTable
CREATE TABLE "ModuleTeachingMember" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "ModuleTeachingMemberRoles" NOT NULL DEFAULT E'VIEWER',
    "moduleId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ModuleTeachingMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ModuleTeachingMember_userId_moduleId_key" ON "ModuleTeachingMember"("userId", "moduleId");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_moduleTeachingMemberId_fkey" FOREIGN KEY ("moduleTeachingMemberId") REFERENCES "ModuleTeachingMember"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleTeachingMember" ADD CONSTRAINT "ModuleTeachingMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleTeachingMember" ADD CONSTRAINT "ModuleTeachingMember_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;
