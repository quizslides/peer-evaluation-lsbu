const routing = {
  home: "/",
  auth: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
  unauthorized: "/unauthorized",
  admin: {
    users: "/admin/users",
    peerEvaluation: "/admin/peer-evaluations",
  },
  student: {
    peerEvaluation: "/student/peer-evaluation",
    peerEvaluations: "/student/peer-evaluations",
  },
  lecturer: {
    peerEvaluations: "/lecturer/peer-evaluations",
    peerEvaluation: {
      create: "/lecturer/peer-evaluation/create",
      edit: "/lecturer/peer-evaluation/edit",
      view: "/lecturer/peer-evaluation/view",
      email: "/lecturer/peer-evaluation/email",
      students: "/lecturer/peer-evaluation/students",
      teams: "/lecturer/peer-evaluation/teams",
      result: {
        team: "/lecturer/peer-evaluation/result/team",
        student: "/lecturer/peer-evaluation/result/student",
      },
    },
  },
  backendEndpoint: "/api",
};

export default routing;
