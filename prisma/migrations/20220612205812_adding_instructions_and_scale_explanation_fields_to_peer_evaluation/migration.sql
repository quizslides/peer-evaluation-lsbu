-- AlterTable
ALTER TABLE "PeerEvaluation" ADD COLUMN     "instructions" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "scaleExplanation" TEXT NOT NULL DEFAULT E'';
