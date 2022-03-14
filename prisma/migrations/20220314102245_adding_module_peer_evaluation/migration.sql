-- CreateEnum
CREATE TYPE "ModuleStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'UNPUBLISHED', 'SUBMISSIONS_LOCKED');

-- CreateEnum
CREATE TYPE "ModuleMemberPermissions" AS ENUM ('OWNER', 'EDITOR', 'VIEWER');

-- CreateEnum
CREATE TYPE "Schools" AS ENUM ('SCHOOL_OF_ARTS_AND_CREATIVE_INDUSTRIES', 'SCHOOL_OF_APPLIED_SCIENCES', 'SCHOOL_OF_THE_BUILT_ENVIRONMENT_AND_ARCHITECTURE', 'LSBU_BUSINESS_SCHOOL', 'SCHOOL_OF_ENGINEERING', 'SCHOOL_OF_LAW_AND_SOCIAL_SCIENCES', 'INSTITUTE_OF_HEALTH_AND_SOCIAL_CARE');

-- CreateTable
CREATE TABLE "Module" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "schools" "Schools"[],
    "moduleCode" TEXT NOT NULL,
    "status" "ModuleStatus" NOT NULL DEFAULT E'DRAFT',
    "maxGradeIncrease" INTEGER NOT NULL DEFAULT 10,
    "maxGradeDecrease" INTEGER NOT NULL DEFAULT 100,
    "submissionsLockDate" TIMESTAMP(3),
    "criteriaScoreRangeMin" INTEGER NOT NULL DEFAULT 1,
    "criteriaScoreRangeMax" INTEGER NOT NULL DEFAULT 5,

    CONSTRAINT "Module_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    "moduleId" TEXT,
    "studentTeamId" TEXT,
    "averageCriteriaScore" DECIMAL(65,30),
    "averageCriteriaScoreByTeamMember" DECIMAL(65,30),
    "systemCalculatedMark" DECIMAL(65,30),
    "systemAdjustedMark" DECIMAL(65,30),
    "lecturerAdjustedMark" DECIMAL(65,30),
    "moduleMemberId" TEXT,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PeerEvaluation" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "studentId" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL,

    CONSTRAINT "PeerEvaluation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PeerEvaluationReviewee" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "studentId" TEXT NOT NULL,
    "criteriaScore" INTEGER NOT NULL,
    "revieweeComment" TEXT NOT NULL,
    "peerEvaluationId" TEXT,

    CONSTRAINT "PeerEvaluationReviewee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PeerEvaluationRevieweeColumn" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "criteriaScore" INTEGER NOT NULL,
    "peerEvaluationRevieweeId" TEXT NOT NULL,
    "peerEvaluationColumnId" TEXT NOT NULL,
    "isInvalid" BOOLEAN NOT NULL,

    CONSTRAINT "PeerEvaluationRevieweeColumn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentTeam" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "mark" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "StudentTeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModuleMember" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "permission" "ModuleMemberPermissions" NOT NULL DEFAULT E'VIEWER',
    "moduleId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ModuleMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PeerEvaluationColumn" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,

    CONSTRAINT "PeerEvaluationColumn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Email" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "moduleId" TEXT,

    CONSTRAINT "Email_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Module_moduleCode_key" ON "Module"("moduleCode");

-- CreateIndex
CREATE UNIQUE INDEX "PeerEvaluation_studentId_key" ON "PeerEvaluation"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "ModuleMember_userId_moduleId_key" ON "ModuleMember"("userId", "moduleId");

-- CreateIndex
CREATE UNIQUE INDEX "PeerEvaluationColumn_moduleId_key" ON "PeerEvaluationColumn"("moduleId");

-- CreateIndex
CREATE UNIQUE INDEX "PeerEvaluationColumn_id_moduleId_key" ON "PeerEvaluationColumn"("id", "moduleId");

-- CreateIndex
CREATE UNIQUE INDEX "Email_moduleId_key" ON "Email"("moduleId");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_studentTeamId_fkey" FOREIGN KEY ("studentTeamId") REFERENCES "StudentTeam"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_moduleMemberId_fkey" FOREIGN KEY ("moduleMemberId") REFERENCES "ModuleMember"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PeerEvaluation" ADD CONSTRAINT "PeerEvaluation_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PeerEvaluationReviewee" ADD CONSTRAINT "PeerEvaluationReviewee_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PeerEvaluationReviewee" ADD CONSTRAINT "PeerEvaluationReviewee_peerEvaluationId_fkey" FOREIGN KEY ("peerEvaluationId") REFERENCES "PeerEvaluation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PeerEvaluationRevieweeColumn" ADD CONSTRAINT "PeerEvaluationRevieweeColumn_peerEvaluationRevieweeId_fkey" FOREIGN KEY ("peerEvaluationRevieweeId") REFERENCES "PeerEvaluationReviewee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PeerEvaluationRevieweeColumn" ADD CONSTRAINT "PeerEvaluationRevieweeColumn_peerEvaluationColumnId_fkey" FOREIGN KEY ("peerEvaluationColumnId") REFERENCES "PeerEvaluationColumn"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleMember" ADD CONSTRAINT "ModuleMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleMember" ADD CONSTRAINT "ModuleMember_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PeerEvaluationColumn" ADD CONSTRAINT "PeerEvaluationColumn_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Email" ADD CONSTRAINT "Email_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE SET NULL ON UPDATE CASCADE;
