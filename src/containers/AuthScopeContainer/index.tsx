import { memo, useEffect, useState } from "react";

import { GetSessionParams, getSession, useSession } from "next-auth/react";

import { ElementChildren } from "@/types";
import { RoleScope, isScopeAuthorized } from "@/utils/permissions";

interface IAuthScopeContainer extends ElementChildren {
  scope?: RoleScope[] | undefined;
}

const AuthScopeContainer = ({ scope, children }: IAuthScopeContainer) => {
  const { data: session } = useSession();

  const [authorized, setAuthorized] = useState<boolean>(false);

  useEffect(() => {
    setAuthorized(isScopeAuthorized(scope, session?.user.role as unknown as RoleScope));
  }, [scope, session]);

  if (authorized) {
    return children;
  }

  return null;
};

AuthScopeContainer.defaultProps = { scope: undefined };

export async function getServerSideProps(context: GetSessionParams | undefined) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}

export default memo(AuthScopeContainer);
