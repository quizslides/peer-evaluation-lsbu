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
  modules: {
    create: "/modules/create",
    edit: "/modules/edit",
    list: "/modules",
  },
  backendEndpoint: "/api/graphql",
};

export default routing;
