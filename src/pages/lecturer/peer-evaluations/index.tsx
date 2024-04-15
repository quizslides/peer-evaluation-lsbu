import React, { useEffect, useState } from "react";

import { NextPage, NextPageContext } from "next";

import { getSession } from "next-auth/react";

import { PeerEvaluationsDataTable } from "@/containers";
import useGetPeerEvaluationsByLecturer from "@/requests/hooks/query/useGetPeerEvaluationsByLecturer";
import routing from "@/routing";
import { sanitizePeerEvaluationsDataOnFetch } from "@/transformers/peer-evaluation";
import { NextPagePros } from "@/types/pages";
import { IPeerEvaluationData } from "@/types/peer-evaluation";
import { RoleScope } from "@/utils";

const PeerEvaluations: NextPage<NextPagePros> = ({ session }) => {
  const [getPeerEvaluationsByLecturer, { loading: loadingQuery, error, data, refetch: runRefreshPeerEvaluations }] =
    useGetPeerEvaluationsByLecturer("GetPeerEvaluationsByLecturer");

  const loading = loadingQuery;

  const [peerEvaluationsData, setPeerEvaluationsData] = useState<IPeerEvaluationData[]>([]);

  useEffect(() => {
    if (data) {
      const peerEvaluationData = sanitizePeerEvaluationsDataOnFetch(data?.peerEvaluationsByLecturer);

      setPeerEvaluationsData(peerEvaluationData);
    }
  }, [data]);

  useEffect(() => {
    if (session && session.user.email) {
      getPeerEvaluationsByLecturer({
        variables: {
          where: {
            lecturerEmail: session.user.email,
          },
        },
      });
    }
  }, [getPeerEvaluationsByLecturer, session]);

  return (
    <PeerEvaluationsDataTable
      redirectUrl={routing.lecturer.peerEvaluations}
      isLoading={loading}
      peerEvaluationsData={peerEvaluationsData}
      isError={!!error}
      refreshPeerEvaluations={runRefreshPeerEvaluations}
      session={session}
      testId={"page-peer-evaluations"}
    />
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

export default PeerEvaluations;
