/*
  Warnings:

  - The values [UNPUBLISHED] on the enum `PeerEvaluationStatuses` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PeerEvaluationStatuses_new" AS ENUM ('DRAFT', 'PUBLISHED', 'SUBMISSIONS_LOCKED');
ALTER TABLE "PeerEvaluation" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "PeerEvaluation" ALTER COLUMN "status" TYPE "PeerEvaluationStatuses_new" USING ("status"::text::"PeerEvaluationStatuses_new");
ALTER TYPE "PeerEvaluationStatuses" RENAME TO "PeerEvaluationStatuses_old";
ALTER TYPE "PeerEvaluationStatuses_new" RENAME TO "PeerEvaluationStatuses";
DROP TYPE "PeerEvaluationStatuses_old";
ALTER TABLE "PeerEvaluation" ALTER COLUMN "status" SET DEFAULT 'DRAFT';
COMMIT;
