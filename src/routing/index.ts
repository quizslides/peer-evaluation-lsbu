const routing = {
  home: "/",
  auth: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
  help: "/help",
  playground: "/playground",
  dashboard: "/dashboard",
  unauthorized: "/unauthorized",
  admin: {
    users: "/admin/users",
    peerEvaluation: "/admin/peer-evaluation",
  },
  peerEvaluation: {
    create: "/peer-evaluation/create",
    edit: "/peer-evaluation/edit",
    list: "/peer-evaluation",
  },
  backendEndpoint: "/api/graphql",
};

export default routing;
