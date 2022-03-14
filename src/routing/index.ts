const routing = {
  home: "/",
  auth: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
  help: "/help",
  playground: "/playground",
  dashboard: "/dashboard",
  unauthorized: "/unauthorized",
  admin: {
    users: "/admin/users",
    modules: "/admin/modules",
  },
  module: {
    create: "/module/create",
  },
  backendEndpoint: "/api/graphql",
};

export default routing;
