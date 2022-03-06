import React, { useEffect } from "react";

import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { LoadingContainer } from "@/containers";
import { loadingNotification, successNotification } from "@/utils";

const SignOut: NextPage = () => {
  const router = useRouter();

  const { data: session } = useSession();

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

export default SignOut;
