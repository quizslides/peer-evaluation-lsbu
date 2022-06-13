import React, { useEffect, useState } from "react";

import { NextPage, NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

import { Base } from "@/components";
import { PeerEvaluationStudentPeerEvaluationContainer } from "@/containers";
import { PeerEvaluationTableStudentLecturerResponse } from "@/pages/api/resolvers/peer-evaluation-table-student-lecturer-query";
import useGetPeerEvaluationTableStudentLecturer from "@/requests/hooks/query/useGetPeerEvaluationTableStudentLecturer";
import { NextPagePros } from "@/types/pages";
import { RoleScope } from "@/utils";

const testId = "page-student-peer";

const LecturerStudentPeerEvaluation: NextPage<NextPagePros> = ({ session }) => {
  const { query } = useRouter();

  const [peerEvaluationTableData, setPeerEvaluationTableData] =
    useState<PeerEvaluationTableStudentLecturerResponse | null>(null);

  const [getPeerEvaluationTableStudentLecturer, { loading: loadingFetch, error, data }] =
    useGetPeerEvaluationTableStudentLecturer("useGetPeerEvaluationTableStudent");

  const isLoading = loadingFetch || !peerEvaluationTableData;

  useEffect(() => {
    const slug = query.slug;

    if (Array.isArray(slug)) {
      const peerEvaluationId = slug[0];

      const studentId = slug[1];

      getPeerEvaluationTableStudentLecturer({
        variables: {
          where: {
            peerEvaluationId: peerEvaluationId,
            studentId: studentId,
          },
        },
      });
    }
  }, [getPeerEvaluationTableStudentLecturer, query.slug]);

  useEffect(() => {
    if (data?.peerEvaluationTableStudentLecturer) {
      setPeerEvaluationTableData(data.peerEvaluationTableStudentLecturer);
    }
  }, [data]);

  return (
    <Base topLeftComponent="menu" loading={isLoading} error={!!error}>
      <PeerEvaluationStudentPeerEvaluationContainer
        peerEvaluationTableData={peerEvaluationTableData}
        session={session}
        testId={testId}
      />
    </Base>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      session: await getSession(context),
      protected: true,
      roles: [RoleScope.ADMIN, RoleScope.LECTURER],
    },
  };
}

export default LecturerStudentPeerEvaluation;
