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
  student: {
    peerEvaluation: "/student/peer-evaluation",
  },
  peerEvaluation: {
    list: "/peer-evaluation",
    create: "/peer-evaluation/create",
    edit: "/peer-evaluation/edit",
    view: "/peer-evaluation/view",
    email: "/peer-evaluation/email",
    students: "/peer-evaluation/students",
    teams: "/peer-evaluation/teams",
    result: {
      team: "/peer-evaluation/result/team",
      student: "/peer-evaluation/result/student",
    },
  },
  backendEndpoint: "/api/graphql",
};

export default routing;
