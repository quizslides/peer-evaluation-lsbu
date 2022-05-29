import React, { useEffect, useState } from "react";

import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { Base, PageTitle } from "@/components";
import { PeerEvaluationStudentTable } from "@/containers";
import { IPeerEvaluationStudentTableForm } from "@/containers/PeerEvaluationStudentTable";
import { PeerEvaluationTableStudentResponse } from "@/pages/api/resolvers/peer-evaluation-table-student";
import useGetPeerEvaluationTableStudent from "@/requests/hooks/query/useGetPeerEvaluationTableStudent";
import { RoleScope } from "@/utils";

const testId = "page-student-peer";

const StudentPeerEvaluation: NextPage = () => {
  const { query } = useRouter();

  const { data: session, status } = useSession();

  const [peerEvaluationCode, setPeerEvaluationCode] = useState<string | null>(null);

  const [peerEvaluationTableData, setPeerEvaluationTableData] = useState<PeerEvaluationTableStudentResponse | null>(
    null
  );

  const [getPeerEvaluationTableStudent, { loading: loadingFetch, error, data }] = useGetPeerEvaluationTableStudent(
    "useGetPeerEvaluationTableStudent"
  );

  const onSubmitPeerEvaluation = (data: IPeerEvaluationStudentTableForm[]) => {
    console.log(data);
  };

  const isLoading = status === "loading" || loadingFetch || !peerEvaluationTableData;

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
      <PageTitle
        title={peerEvaluationTableData?.peerEvaluation?.title || ""}
        testId={`${testId}-title`}
        variant="h4"
        margin="2em"
      />
      {peerEvaluationTableData && (
        <PeerEvaluationStudentTable onSubmit={onSubmitPeerEvaluation} data={peerEvaluationTableData} />
      )}
    </Base>
  );
};

export const getStaticPaths = async () => {
  return { paths: [], fallback: true };
};

export const getStaticProps = () => {
  return {
    props: {
      protected: true,
      roles: [RoleScope.ADMIN, RoleScope.LECTURER, RoleScope.STUDENT],
    },
  };
};

export default StudentPeerEvaluation;
