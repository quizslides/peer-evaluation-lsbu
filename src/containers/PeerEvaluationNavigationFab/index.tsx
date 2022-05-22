import React, { memo, useEffect, useState } from "react";

import { useRouter } from "next/router";
import { Action, Fab } from "react-tiny-fab";

import { DashboardIcon, EmailIcon, PagesIcon, StudentIcon, TeamIcon } from "@/icons";
import routing from "@/routing";

interface IPeerEvaluationNavigationFab {
  setRedirecting: () => void;
  hide?: boolean;
}

const testIdBase = "peer-evaluation-navigation";

const PeerEvaluationNavigationFab = ({ setRedirecting, hide }: IPeerEvaluationNavigationFab) => {
  const router = useRouter();

  const [peerEvaluationId, setPeerEvaluationId] = useState<string | null>(null);

  useEffect(() => {
    const slug = router.query.slug;

    if (Array.isArray(slug)) {
      const peerEvaluationId = slug[0];

      setPeerEvaluationId(peerEvaluationId);
    }
  }, [router.query.slug]);

  const navigateToPage = (pageRoute: string) => {
    if (!router.pathname.includes(pageRoute)) {
      router.push(`${pageRoute}/${peerEvaluationId}`);
      setRedirecting();
    } else {
    }
  };

  const listActionIcon = [
    {
      text: "Dashboard",
      pageRoute: routing.peerEvaluation.view,
      testId: `${testIdBase}-dashboard`,
      Icon: DashboardIcon,
    },
    {
      text: "Teams",
      pageRoute: routing.peerEvaluation.teams,
      testId: `${testIdBase}-teams`,
      Icon: TeamIcon,
    },
    {
      text: "Students",
      pageRoute: routing.peerEvaluation.students,
      testId: `${testIdBase}-students`,
      Icon: StudentIcon,
    },
    {
      text: "Email",
      pageRoute: routing.peerEvaluation.email,
      testId: `${testIdBase}-email`,
      Icon: EmailIcon,
    },
  ];

  const getListActionIcon = () => {
    return listActionIcon.map(({ text, pageRoute, testId, Icon }) => (
      <Action key={text} text={text} onClick={() => navigateToPage(pageRoute)}>
        <Icon style={{ color: router.pathname.includes(pageRoute) ? "grey" : undefined }} testId={testId} />
      </Action>
    ));
  };

  if (hide) {
    return null;
  }

  return (
    <Fab style={{ top: 24, right: 24 }} icon={<PagesIcon testId={testIdBase} />}>
      {getListActionIcon()}
    </Fab>
  );
};

PeerEvaluationNavigationFab.defaultProps = { hide: false };

export default memo(PeerEvaluationNavigationFab);
