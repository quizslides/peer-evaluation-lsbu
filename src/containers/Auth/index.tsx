import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { LoadingContainer } from "@/containers";
import routing from "@/routing";
import { ElementChildren } from "@/types";
import { RoleScope, isScopeAuthorized } from "@/utils/permissions";

interface IAuthenticatedRoute extends ElementChildren {
  roles?: RoleScope[];
}

const AuthenticatedRoute = ({ children, roles }: IAuthenticatedRoute) => {
  const { data: session, status } = useSession();

  const [isRouteVerified, setRouteVerified] = useState<boolean>(false);

  const [isRedirecting, setRedirecting] = useState<boolean>(false);

  const loading = status === "loading";

  const hasUser = !!session?.user;

  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!hasUser && window.location.pathname !== routing.auth.signIn) {
        router.push({
          pathname: routing.auth.signIn,
          query: {
            redirectUrl: window.location.pathname,
          },
        });

        setRedirecting(true);
      } else if (session && roles && !isScopeAuthorized(roles, session.user.role as unknown as RoleScope)) {
        router.push(routing.unauthorized);
        setRedirecting(true);
      }
      setRouteVerified(true);
    }
  }, [loading, hasUser, router, roles, session]);

  if (loading || !isRouteVerified || isRedirecting) {
    return <LoadingContainer loading={loading} />;
  }

  return children;
};

AuthenticatedRoute.defaultProps = { roles: [] };

export default AuthenticatedRoute;
