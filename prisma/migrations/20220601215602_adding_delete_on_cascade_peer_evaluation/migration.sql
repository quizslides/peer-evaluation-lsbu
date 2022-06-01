-- DropForeignKey
ALTER TABLE "Email" DROP CONSTRAINT "Email_peerEvaluationId_fkey";

-- DropForeignKey
ALTER TABLE "PeerEvaluationReviewee" DROP CONSTRAINT "PeerEvaluationReviewee_peerEvaluationReviewId_fkey";

-- DropForeignKey
ALTER TABLE "PeerEvaluationReviewee" DROP CONSTRAINT "PeerEvaluationReviewee_studentReviewedId_fkey";

-- DropForeignKey
ALTER TABLE "PeerEvaluationRevieweeColumn" DROP CONSTRAINT "PeerEvaluationRevieweeColumn_peerEvaluationColumnId_fkey";

-- DropForeignKey
ALTER TABLE "PeerEvaluationRevieweeColumn" DROP CONSTRAINT "PeerEvaluationRevieweeColumn_peerEvaluationRevieweeId_fkey";

-- DropForeignKey
ALTER TABLE "PeerEvaluationStudent" DROP CONSTRAINT "PeerEvaluationStudent_peerEvaluationId_fkey";

-- DropForeignKey
ALTER TABLE "PeerEvaluationStudentReview" DROP CONSTRAINT "PeerEvaluationStudentReview_peerEvaluationStudentId_fkey";

-- DropForeignKey
ALTER TABLE "PeerEvaluationStudentTeam" DROP CONSTRAINT "PeerEvaluationStudentTeam_peerEvaluationId_fkey";

-- AddForeignKey
ALTER TABLE "PeerEvaluationStudent" ADD CONSTRAINT "PeerEvaluationStudent_peerEvaluationId_fkey" FOREIGN KEY ("peerEvaluationId") REFERENCES "PeerEvaluation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PeerEvaluationStudentReview" ADD CONSTRAINT "PeerEvaluationStudentReview_peerEvaluationStudentId_fkey" FOREIGN KEY ("peerEvaluationStudentId") REFERENCES "PeerEvaluationStudent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PeerEvaluationReviewee" ADD CONSTRAINT "PeerEvaluationReviewee_studentReviewedId_fkey" FOREIGN KEY ("studentReviewedId") REFERENCES "PeerEvaluationStudent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PeerEvaluationReviewee" ADD CONSTRAINT "PeerEvaluationReviewee_peerEvaluationReviewId_fkey" FOREIGN KEY ("peerEvaluationReviewId") REFERENCES "PeerEvaluationStudentReview"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PeerEvaluationRevieweeColumn" ADD CONSTRAINT "PeerEvaluationRevieweeColumn_peerEvaluationRevieweeId_fkey" FOREIGN KEY ("peerEvaluationRevieweeId") REFERENCES "PeerEvaluationReviewee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PeerEvaluationRevieweeColumn" ADD CONSTRAINT "PeerEvaluationRevieweeColumn_peerEvaluationColumnId_fkey" FOREIGN KEY ("peerEvaluationColumnId") REFERENCES "PeerEvaluationColumn"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PeerEvaluationStudentTeam" ADD CONSTRAINT "PeerEvaluationStudentTeam_peerEvaluationId_fkey" FOREIGN KEY ("peerEvaluationId") REFERENCES "PeerEvaluation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Email" ADD CONSTRAINT "Email_peerEvaluationId_fkey" FOREIGN KEY ("peerEvaluationId") REFERENCES "PeerEvaluation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
