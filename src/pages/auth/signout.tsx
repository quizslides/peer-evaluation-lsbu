import React, { useEffect } from "react";

import type { NextPage, NextPageContext } from "next";

import { useRouter } from "next/router";
import { getSession, signOut } from "next-auth/react";

import { LoadingContainer } from "@/containers";
import { NextPagePros } from "@/types/pages";
import { loadingNotification, successNotification } from "@/utils";

const SignOut: NextPage<NextPagePros> = ({ session }) => {
  const router = useRouter();

  useEffect(() => {
    const notificationsId = loadingNotification("Closing your session...", "signOut");

    signOut({ redirect: false, callbackUrl: "/" }).then((data) => {
      successNotification("Bye Bye", notificationsId);

      router.push(data.url);
    });
  }, [router, session]);

  if (session) {
    return <LoadingContainer loading={!!session} />;
  }

  return null;
};

export async function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}

export default SignOut;
