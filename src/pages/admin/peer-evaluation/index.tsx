import React, { useEffect, useState } from "react";

import { NextPage } from "next";
import { useSession } from "next-auth/react";

import { PeerEvaluationsDataTable } from "@/containers";
import useGetPeerEvaluations from "@/requests/hooks/query/useGetPeerEvaluations";
import routing from "@/routing";
import { IPeerEvaluationDataTable, Schools, SchoolsDropdown } from "@/types/peer-evaluation";
import { RoleScope } from "@/utils";

const PeerEvaluationsAdmin: NextPage = () => {
  const { data: session, status } = useSession();

  const { data, loading: loadingQuery, error, refetch: runRefreshPeerEvaluations } = useGetPeerEvaluations();

  const loading = status === "loading" || loadingQuery;

  const [peerEvaluationsData, setPeerEvaluationsData] = useState<IPeerEvaluationDataTable[]>([]);

  useEffect(() => {
    if (data) {
      const peerEvaluationData = data?.peerEvaluations as unknown as IPeerEvaluationDataTable[];

      console.log(peerEvaluationData[0]);

      for (let index in peerEvaluationData) {
        peerEvaluationData[index].schoolsDataTable = peerEvaluationData[index].schools.map(
          (school) => SchoolsDropdown[school]
        ) as Schools[];
      }

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
