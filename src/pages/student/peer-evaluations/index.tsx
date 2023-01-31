import React, { useEffect, useState } from "react";

import type { NextPage } from "next";
import { useRouter } from "next/router";

import { Base, PageTitle } from "@/components";
import PeerEvaluationsStudentDataTable from "@/containers/PeerEvaluationsStudentDataTable";
import content from "@/content";
import { PeerEvaluationsStudentResponse } from "@/pages/api/resolvers/student/peer-evaluations-query";
import useGetPeerEvaluationsStudent from "@/requests/hooks/query/useGetPeerEvaluationsStudent";
import routing from "@/routing";
import { NextPagePros } from "@/types/pages";
import { RoleScope } from "@/utils";

const testId = "page-student-peer-evaluations";

const StudentPeerEvaluations: NextPage<NextPagePros> = () => {
  const router = useRouter();

  const [peerEvaluationsStudentData, setPeerEvaluationsStudentData] = useState<PeerEvaluationsStudentResponse | null>(
    null
  );

  const { data, loading, error, refetch } = useGetPeerEvaluationsStudent();

  const [isRedirecting, setRedirecting] = useState(false);

  const onViewPeerEvaluation = (code: string) => {
    setRedirecting(true);

    router.push({
      pathname: `${routing.student.peerEvaluation}/${code}`,
      query: {
        redirectUrl: routing.student.peerEvaluations,
      },
    });
  };

  useEffect(() => {
    if (data?.peerEvaluationsStudent) {
      setPeerEvaluationsStudentData(data.peerEvaluationsStudent);
    }
  }, [data]);

  const isLoading = loading || !peerEvaluationsStudentData || isRedirecting;

  return (
    <Base topLeftComponent="menu" loading={isLoading} error={!!error}>
      <PageTitle title={content.pages.student.peerEvaluations.title} testId={testId} variant="h4" margin="2em" />

      {peerEvaluationsStudentData && (
        <PeerEvaluationsStudentDataTable
          data={peerEvaluationsStudentData}
          testId={testId}
          onViewPeerEvaluation={onViewPeerEvaluation}
          onRefresh={() => refetch()}
        />
      )}
    </Base>
  );
};

export const getServerSideProps = async () => {
  return {
    props: {
      protected: true,
      roles: [RoleScope.ADMIN, RoleScope.STUDENT],
    },
  };
};

export default StudentPeerEvaluations;
