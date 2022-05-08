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
    list: "/peer-evaluation",
    create: "/peer-evaluation/create",
    edit: "/peer-evaluation/edit",
    view: "/peer-evaluation/view",
    email: "/peer-evaluation/email",
  },
  backendEndpoint: "/api/graphql",
};

export default routing;
