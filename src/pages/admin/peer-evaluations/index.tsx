import React, { useEffect, useState } from "react";

import { NextPage, NextPageContext } from "next";

import { getSession } from "next-auth/react";

import { PeerEvaluationsDataTable } from "@/containers";
import useGetPeerEvaluationsAdmin from "@/requests/hooks/query/useGetPeerEvaluationsAdmin";
import routing from "@/routing";
import { sanitizePeerEvaluationsDataOnFetch } from "@/transformers/peer-evaluation";
import { NextPagePros } from "@/types/pages";
import { IPeerEvaluationData } from "@/types/peer-evaluation";
import { RoleScope } from "@/utils";

const PeerEvaluationsAdmin: NextPage<NextPagePros> = ({ session }) => {
  const {
    data,
    loading: loadingQuery,
    error,
    refetch: runRefreshPeerEvaluations,
  } = useGetPeerEvaluationsAdmin("GetPeerEvaluationsAdmin");

  const loading = !session || loadingQuery;

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

export async function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      session: await getSession(context),
      protected: true,
      roles: [RoleScope.ADMIN],
    },
  };
}

export default PeerEvaluationsAdmin;
