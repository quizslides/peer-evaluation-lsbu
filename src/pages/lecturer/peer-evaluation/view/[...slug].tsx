import React, { useEffect, useState } from "react";

import { NextPage, NextPageContext } from "next";

import { Container, Stack } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

import { Base, Message, PageTitle } from "@/components";
import { PeerEvaluationNavigationFab } from "@/containers";
import PeerEvaluationDashboardContainer from "@/containers/PeerEvaluationDashboardContainer";
import content from "@/content";
import { VisibilityOffIcon } from "@/icons";
import { PeerEvaluationDashboard } from "@/pages/api/resolvers/lecturer/peer-evaluation";
import useGetPeerEvaluationDashboard from "@/requests/hooks/query/useGetPeerEvaluationDashboard";
import { CenteredContent, theme } from "@/styles";
import { sanitizePeerEvaluationViewDataOnFetch } from "@/transformers/peer-evaluation";
import { NextPagePros } from "@/types/pages";
import { RoleScope } from "@/utils";

const testIdBase = content.pages.lecturer.peerEvaluation.testId;

const ViewPeerEvaluation: NextPage<NextPagePros> = ({ session }) => {
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
      {!peerEvaluationData && (
        <CenteredContent>
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
            <VisibilityOffIcon testId={testIdBase} fontSize="large" />
            <Message testId={`${testIdBase}-not-found-peer-evaluation`}>
              {"Peer Evaluation is not available or does not exist"}
            </Message>
          </Stack>
        </CenteredContent>
      )}

      {peerEvaluationData && (
        <>
          <PageTitle
            title={`Peer Evaluation - ${peerEvaluationData?.code}`}
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
              {peerEvaluationData && <PeerEvaluationDashboardContainer data={peerEvaluationData} session={session} />}
            </ThemeProvider>
          </Container>
          <PeerEvaluationNavigationFab setRedirecting={() => setRedirecting(true)} />
        </>
      )}
    </Base>
  );
};

export const getServerSideProps = async (context: NextPageContext) => {
  return {
    props: {
      session: await getSession(context),
      protected: true,
      roles: [RoleScope.ADMIN, RoleScope.LECTURER],
    },
  };
};

export default ViewPeerEvaluation;
