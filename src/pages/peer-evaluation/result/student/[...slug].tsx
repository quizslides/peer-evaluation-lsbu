import React, { useEffect, useState } from "react";

import { NextPage } from "next";
import { useRouter } from "next/router";

import { Base, PageTitle } from "@/components";
import { PeerEvaluationStudentTable } from "@/containers";
import { PeerEvaluationTableStudentLecturerResponse } from "@/pages/api/resolvers/peer-evaluation-table-student-lecturer-query";
import useGetPeerEvaluationTableStudentLecturer from "@/requests/hooks/query/useGetPeerEvaluationTableStudentLecturer";
import { RoleScope } from "@/utils";

const testId = "page-student-peer";

const LecturerStudentPeerEvaluation: NextPage = () => {
  const { query } = useRouter();

  const [peerEvaluationTableData, setPeerEvaluationTableData] =
    useState<PeerEvaluationTableStudentLecturerResponse | null>(null);

  const [getPeerEvaluationTableStudentLecturer, { loading: loadingFetch, error, data }] =
    useGetPeerEvaluationTableStudentLecturer("useGetPeerEvaluationTableStudent");

  const isLoading = status === "loading" || loadingFetch || !peerEvaluationTableData;

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
      <PageTitle
        title={peerEvaluationTableData?.peerEvaluation?.title || ""}
        testId={`${testId}-title`}
        variant="h4"
        margin="2em"
      />
      {peerEvaluationTableData && <PeerEvaluationStudentTable onSubmit={() => null} data={peerEvaluationTableData} />}
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
      roles: [RoleScope.ADMIN, RoleScope.LECTURER],
    },
  };
};

export default LecturerStudentPeerEvaluation;
