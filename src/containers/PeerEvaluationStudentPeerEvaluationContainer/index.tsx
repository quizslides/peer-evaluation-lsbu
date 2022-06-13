import React, { memo } from "react";

import { Grid, Stack } from "@mui/material";
import { Session } from "next-auth";

import HelperContainerWrapper from "../HelperContainerWrapper";
import PeerEvaluationInfo from "../PeerEvaluationInfo";
import PeerEvaluationStudentTable, { IPeerEvaluationStudentTableForm } from "../PeerEvaluationStudentTable";
import PeerEvaluationStudentTableInstructions from "../PeerEvaluationStudentTableInstructions";
import PeerEvaluationStudentTableScaleExplanation from "../PeerEvaluationStudentTableScaleExplanation";

import { PageTitle } from "@/components";
import { VisibilityOffIcon } from "@/icons";
import { PeerEvaluationTableStudentLecturerResponse } from "@/pages/api/resolvers/peer-evaluation-table-student-lecturer-query";
import { PeerEvaluationTableStudentResponse } from "@/pages/api/resolvers/peer-evaluation-table-student-query";
import { CenteredContent } from "@/styles";

interface IPeerEvaluationStudentPeerEvaluationContainer {
  peerEvaluationTableData: PeerEvaluationTableStudentResponse | PeerEvaluationTableStudentLecturerResponse | null;
  session: Session | null;
  testId: string;
  onSubmitPeerEvaluation?: (data: IPeerEvaluationStudentTableForm[]) => Promise<void>;
}

const PeerEvaluationStudentPeerEvaluationContainer = ({
  peerEvaluationTableData,
  session,
  testId,
  onSubmitPeerEvaluation,
}: IPeerEvaluationStudentPeerEvaluationContainer) => {
  return (
    <>
      {peerEvaluationTableData && !peerEvaluationTableData.visible && (
        <CenteredContent>
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
            <VisibilityOffIcon testId={`${testId}-visibility-off-icon`} fontSize="large" />
          </Stack>
        </CenteredContent>
      )}

      {peerEvaluationTableData && peerEvaluationTableData.visible && session && (
        <>
          <PageTitle
            title={peerEvaluationTableData?.peerEvaluation?.title || ""}
            testId={`${testId}-title`}
            variant="h4"
            margin="2em"
          />
          {peerEvaluationTableData.peerEvaluationStudentInfo && (
            <Grid container direction="row" justifyContent="space-between" alignItems="flex-end">
              <PeerEvaluationInfo
                teamName={peerEvaluationTableData.peerEvaluationStudentInfo.studentTeamName}
                submissionDeadline={peerEvaluationTableData.peerEvaluationStudentInfo.submissionsLockDate}
                updatedAt={peerEvaluationTableData.peerEvaluationStudentInfo.updatedAt}
                studentEmail={peerEvaluationTableData.peerEvaluationStudentInfo.studentEmail}
                studentName={peerEvaluationTableData.peerEvaluationStudentInfo.studentName}
              />
              <HelperContainerWrapper>
                <Stack direction="column" justifyContent="flex-start" alignItems="flex-end" spacing={2}>
                  <PeerEvaluationStudentTableInstructions
                    instructions={peerEvaluationTableData.peerEvaluation?.instructions}
                    testId={testId}
                  />
                  <PeerEvaluationStudentTableScaleExplanation
                    scaleExplanation={peerEvaluationTableData.peerEvaluation?.scaleExplanation}
                    testId={testId}
                  />
                </Stack>
              </HelperContainerWrapper>
            </Grid>
          )}
          <PeerEvaluationStudentTable
            onSubmit={onSubmitPeerEvaluation}
            session={session}
            data={peerEvaluationTableData}
          />
        </>
      )}
    </>
  );
};

export default memo(PeerEvaluationStudentPeerEvaluationContainer);
