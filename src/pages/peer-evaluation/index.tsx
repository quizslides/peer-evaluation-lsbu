import React, { useEffect, useState } from "react";

import { NextPage } from "next";
import { useSession } from "next-auth/react";

import { PeerEvaluationsDataTable } from "@/containers";
import useGetPeerEvaluationsByLecturer from "@/requests/hooks/query/useGetPeerEvaluationsByLecturer";
import routing from "@/routing";
import { sanitizePeerEvaluationsDataOnFetch } from "@/transformers/peer-evaluation";
import { IPeerEvaluationData } from "@/types/peer-evaluation";
import { RoleScope } from "@/utils";

const PeerEvaluations: NextPage = () => {
  const { data: session, status } = useSession();

  const [getPeerEvaluations, { loading: loadingQuery, error, data, refetch: runRefreshPeerEvaluations }] =
    useGetPeerEvaluationsByLecturer("GetPeerEvaluationsByLecturer");

  const loading = status === "loading" || loadingQuery;

  const [peerEvaluationsData, setPeerEvaluationsData] = useState<IPeerEvaluationData[]>([]);

  useEffect(() => {
    if (data) {
      const peerEvaluationData = sanitizePeerEvaluationsDataOnFetch(data?.peerEvaluationsByLecturer);

      setPeerEvaluationsData(peerEvaluationData);
    }
  }, [data]);

  useEffect(() => {
    if (session && session.user.email) {
      getPeerEvaluations({
        variables: {
          where: {
            email: session.user.email,
          },
        },
      });
    }
  }, [getPeerEvaluations, session]);

  return (
    <PeerEvaluationsDataTable
      redirectUrl={routing.peerEvaluation.list}
      isLoading={loading}
      peerEvaluationsData={peerEvaluationsData}
      isError={!!error}
      refreshPeerEvaluations={runRefreshPeerEvaluations}
      session={session}
      testId={"page-peer-evaluations"}
    />
  );
};

export const getStaticProps = () => {
  return {
    props: {
      protected: true,
      roles: [RoleScope.ADMIN, RoleScope.LECTURER],
    },
  };
};

export default PeerEvaluations;
