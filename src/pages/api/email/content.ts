const content = {
  global: {
    from: `"Peer Evaluation" ${process.env.SMTP_FROM}`,
  },
  emailTemplates: {
    sendSignInEmail: {
      subject: "Sign in link for Peer Evaluation LSBU",
      variables: {
        preHeader: "This link will expire in 24 hours",
        expireTime: 24,
        expireTimeUnit: "hours",
      },
    },
    sendWelcomeEmail: {
      subject: "Welcome to Peer Evaluation LSBU",
      variables: {
        preHeader: "Account created",
        baseUrl: process.env.NEXTAUTH_URL,
      },
    },
  },
};

export default content;
