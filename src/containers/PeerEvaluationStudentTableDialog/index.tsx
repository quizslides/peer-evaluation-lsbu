import React, { memo, useEffect, useState } from "react";

import { Session } from "next-auth";

import { Base, Dialog } from "@/components";
import { PeerEvaluationStudentTable } from "@/containers";
import { PeerEvaluationTableStudentLecturerResponse } from "@/pages/api/resolvers/lecturer/peer-evaluation-table-student-lecturer-query";
import useGetPeerEvaluationTableStudentLecturer from "@/requests/hooks/query/useGetPeerEvaluationTableStudentLecturer";

interface IPeerEvaluationStudentTableDialog {
  session: Session;
  peerEvaluationId: string;
  studentId: string;
  isDialogOpen: boolean;
  updateDialogState: (state: boolean) => void;
}

const PeerEvaluationStudentTableDialog = ({
  session,
  peerEvaluationId,
  studentId,
  isDialogOpen,
  updateDialogState,
}: IPeerEvaluationStudentTableDialog) => {
  const [peerEvaluationTableData, setPeerEvaluationTableData] =
    useState<PeerEvaluationTableStudentLecturerResponse | null>(null);

  const [getPeerEvaluationTableStudentLecturer, { loading: loadingFetch, error, data }] =
    useGetPeerEvaluationTableStudentLecturer("useGetPeerEvaluationTableStudent");

  const isLoading = loadingFetch || !peerEvaluationTableData;

  useEffect(() => {
    getPeerEvaluationTableStudentLecturer({
      variables: {
        where: {
          peerEvaluationId: peerEvaluationId,
          studentId: studentId,
        },
      },
    });
  }, [getPeerEvaluationTableStudentLecturer, peerEvaluationId, studentId, isDialogOpen]);

  useEffect(() => {
    if (data?.peerEvaluationTableStudentLecturer) {
      setPeerEvaluationTableData(data.peerEvaluationTableStudentLecturer);
    }
  }, [data]);

  return (
    <Dialog
      testId={""}
      title={"Peer Evaluation Student Table"}
      content={
        <Base topLeftComponent="none" loading={isLoading} error={!!error}>
          {peerEvaluationTableData && <PeerEvaluationStudentTable data={peerEvaluationTableData} session={session} />}
        </Base>
      }
      fullScreen
      rightButton="Close"
      rightButtonVariant="contained"
      onClickRightButton={() => updateDialogState(false)}
      isDisableLeftButton
      open={isDialogOpen}
    />
  );
};

export default memo(PeerEvaluationStudentTableDialog);
