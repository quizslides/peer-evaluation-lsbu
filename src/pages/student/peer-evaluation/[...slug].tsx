import React, { useEffect, useState } from "react";

import { useApolloClient } from "@apollo/client";
import { NextPage, NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

import { Base } from "@/components";
import { PeerEvaluationStudentPeerEvaluationContainer } from "@/containers";
import { IPeerEvaluationStudentTableForm } from "@/containers/PeerEvaluationStudentTable";
import { PeerEvaluationTableStudentResponse } from "@/pages/api/resolvers/student/peer-evaluation-table-student-query";
import updatePeerEvaluationTableStudent from "@/requests/direct/mutation/updatePeerEvaluationTableStudent";
import useGetPeerEvaluationTableStudent from "@/requests/hooks/query/useGetPeerEvaluationTableStudent";
import { getSanitizedPeerEvaluationTableOnUpdate } from "@/transformers/peer-evaluation-student-table";
import { NextPagePros } from "@/types/pages";
import { RoleScope, errorNotification, loadingNotification, successNotification } from "@/utils";
import { ObjectArrayOfObject, ObjectNormalizedType, getNormalizedObjectArray } from "@/utils/form";

const testId = "page-student-peer";

const StudentPeerEvaluation: NextPage<NextPagePros> = ({ session }) => {
  const apolloClient = useApolloClient();

  const { query } = useRouter();

  const [peerEvaluationCode, setPeerEvaluationCode] = useState<string | null>(null);

  const [peerEvaluationTableData, setPeerEvaluationTableData] = useState<PeerEvaluationTableStudentResponse | null>(
    null
  );

  const [getPeerEvaluationTableStudent, { loading: loadingFetch, error, data, refetch }] =
    useGetPeerEvaluationTableStudent("useGetPeerEvaluationTableStudent");

  const onSubmitPeerEvaluation = async (data: IPeerEvaluationStudentTableForm[]) => {
    loadingNotification("Updating Peer Evaluation", "onSubmitPeerEvaluation");

    if (peerEvaluationTableData?.peerEvaluation?.columns) {
      const columnList = peerEvaluationTableData.peerEvaluation.columns.map((column) => column.id);

      const dataModuleNormalized = getNormalizedObjectArray(data as unknown as ObjectNormalizedType);

      const dataSanitized = getSanitizedPeerEvaluationTableOnUpdate(
        dataModuleNormalized as unknown as ObjectArrayOfObject,
        columnList
      );

      const response = await updatePeerEvaluationTableStudent(apolloClient, dataSanitized);

      if (response.data.updatePeerEvaluationTableStudent.completed) {
        successNotification(response.data.updatePeerEvaluationTableStudent.message, "onSubmitPeerEvaluation");
        await refetch();
      } else {
        errorNotification(response.data.updatePeerEvaluationTableStudent.message, "onSubmitPeerEvaluation");
      }
    }
  };

  const isLoading = loadingFetch || !peerEvaluationTableData;

  useEffect(() => {
    const slug = query.slug;

    if (Array.isArray(slug)) {
      const peerEvaluationCode = slug[0];

      setPeerEvaluationCode(peerEvaluationCode);
    }
  }, [query.slug]);

  useEffect(() => {
    if (session && peerEvaluationCode) {
      getPeerEvaluationTableStudent({
        variables: {
          where: {
            peerEvaluationCode: peerEvaluationCode,
            userId: session.user.id,
          },
          orderBy: [
            {
              studentReviewed: {
                studentName: "asc",
              },
            },
          ],
        },
      });
    }
  }, [getPeerEvaluationTableStudent, peerEvaluationCode, session]);

  useEffect(() => {
    if (data?.peerEvaluationTableStudent) {
      setPeerEvaluationTableData(data.peerEvaluationTableStudent);
    }
  }, [data]);

  return (
    <Base topLeftComponent="menu" loading={isLoading} error={!!error}>
      <PeerEvaluationStudentPeerEvaluationContainer
        peerEvaluationTableData={peerEvaluationTableData}
        session={session}
        testId={testId}
        onSubmitPeerEvaluation={onSubmitPeerEvaluation}
      />
    </Base>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      session: await getSession(context),
      protected: true,
      roles: [RoleScope.ADMIN, RoleScope.LECTURER, RoleScope.STUDENT],
    },
  };
}

export default StudentPeerEvaluation;
