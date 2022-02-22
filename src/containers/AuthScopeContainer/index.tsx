import React, { memo, useEffect, useState } from "react";

import { GetSessionParams, getSession, useSession } from "next-auth/react";

import { ElementChildren } from "@/types";
import { ROLE, isScopeAuthorized } from "@/utils/permissions";

interface IAuthScopeContainer extends ElementChildren {
  scope?: ROLE[] | undefined;
}

const AuthScopeContainer = ({ scope, children }: IAuthScopeContainer) => {
  const { data: session } = useSession();

  const [authorized, setAuthorized] = useState<boolean>(false);

  useEffect(() => {
    setAuthorized(isScopeAuthorized(scope, session?.user.role));
  }, [scope, session]);

  if (authorized) {
    return children;
  }

  return <></>;
};

export async function getServerSideProps(context: GetSessionParams | undefined) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}

export default memo(AuthScopeContainer);
