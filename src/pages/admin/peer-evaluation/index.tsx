import React, { useEffect, useState } from "react";

import { NextPage } from "next";
import { useSession } from "next-auth/react";

import { PeerEvaluationsDataTable } from "@/containers";
import useGetPeerEvaluationsAdmin from "@/requests/hooks/query/useGetPeerEvaluationsAdmin";
import routing from "@/routing";
import { sanitizePeerEvaluationsDataOnFetch } from "@/transformers/peer-evaluation";
import { IPeerEvaluationData, Schools, SchoolsDropdown } from "@/types/peer-evaluation";
import { RoleScope } from "@/utils";

const PeerEvaluationsAdmin: NextPage = () => {
  const { data: session, status } = useSession();

  const {
    data,
    loading: loadingQuery,
    error,
    refetch: runRefreshPeerEvaluations,
  } = useGetPeerEvaluationsAdmin("GetPeerEvaluationsAdmin");

  const loading = status === "loading" || loadingQuery;

  const [peerEvaluationsData, setPeerEvaluationsData] = useState<IPeerEvaluationData[]>([]);

  useEffect(() => {
    if (data) {
      const peerEvaluationData = sanitizePeerEvaluationsDataOnFetch(data?.peerEvaluations);

      setPeerEvaluationsData(peerEvaluationData);
    }
  }, [data]);

  return (
    <PeerEvaluationsDataTable
      redirectUrl={routing.admin.peerEvaluation}
      isLoading={loading}
      peerEvaluationsData={peerEvaluationsData}
      isError={!!error}
      refreshPeerEvaluations={runRefreshPeerEvaluations}
      session={session}
      testId={"page-admin-peer-evaluations"}
    />
  );
};

export const getStaticProps = () => {
  return {
    props: {
      protected: true,
      roles: [RoleScope.ADMIN],
    },
  };
};

export default PeerEvaluationsAdmin;
