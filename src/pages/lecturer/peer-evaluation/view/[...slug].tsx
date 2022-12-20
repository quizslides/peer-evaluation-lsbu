import React, { useEffect, useState } from "react";

import { Container } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { Base, PageTitle } from "@/components";
import { PeerEvaluationNavigationFab } from "@/containers";
import PeerEvaluationDashboardContainer from "@/containers/PeerEvaluationDashboardContainer";
import { PeerEvaluationDashboard } from "@/pages/api/resolvers/lecturer/peer-evaluation";
import useGetPeerEvaluationDashboard from "@/requests/hooks/query/useGetPeerEvaluationDashboard";
import { theme } from "@/styles/index";
import { sanitizePeerEvaluationViewDataOnFetch } from "@/transformers/peer-evaluation";
import { RoleScope } from "@/utils";

const ViewPeerEvaluation: NextPage = () => {
  const { query, isFallback } = useRouter();

  const [isRedirecting, setRedirecting] = useState(false);

  const [peerEvaluationId, setPeerEvaluationId] = useState<string | null>(null);

  const [peerEvaluationData, setPeerEvaluationData] = useState<PeerEvaluationDashboard | null>(null);

  const [getPeerEvaluationDashboard, { loading: loadingFetch, error, data }] =
    useGetPeerEvaluationDashboard("PeerEvaluationDashboard");

  useEffect(() => {
    const slug = query.slug;

    if (Array.isArray(slug)) {
      const peerEvaluationId = slug[0];

      setPeerEvaluationId(peerEvaluationId);

      getPeerEvaluationDashboard({
        variables: {
          where: {
            peerEvaluationId,
          },
        },
      });
    }
  }, [getPeerEvaluationDashboard, query.slug]);

  useEffect(() => {
    if (data?.peerEvaluationDashboard) {
      setPeerEvaluationData(sanitizePeerEvaluationViewDataOnFetch(data.peerEvaluationDashboard));
    }
  }, [data]);

  const isLoading = isRedirecting || isFallback || !peerEvaluationId || !data || loadingFetch;

  return (
    <Base topLeftComponent="menu" loading={isLoading} error={!!error}>
      <PageTitle
        title={`Peer Evaluation - ${data?.peerEvaluationDashboard.code}`}
        testId="page-view-peer-evaluation-title"
        variant="h4"
        margin="2em"
      />
      <Container maxWidth="lg">
        <ThemeProvider
          theme={createTheme({
            ...theme,
            breakpoints: {
              values: {
                xs: 0,
                sm: 0,
                md: 5000,
                lg: 1280,
                xl: 1920,
              },
            },
          })}
        >
          {peerEvaluationData && <PeerEvaluationDashboardContainer data={peerEvaluationData} />}
        </ThemeProvider>
      </Container>
      <PeerEvaluationNavigationFab setRedirecting={() => setRedirecting(true)} />
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

export default ViewPeerEvaluation;
