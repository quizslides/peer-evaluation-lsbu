const content = {
  components: {
    base: {
      head: {
        siteTitle: "London South Bank University - Peer Evaluation",
        description: "Peer Evaluation Web App",
      },
      footer: {
        text: "Peer Evaluation by LSBU",
        href: "#",
      },
    },
  },
  containers: {
    errorContainer: {
      button: "Click here to refresh",
      text: "Something went wrong...",
    },
  },
  pages: {
    homePage: {
      title: "Peer Evaluation",
      signIn: {
        button: {
          text: "Sign In",
        },
      },
      playground: {
        button: {
          text: "Playground",
        },
      },
      dashboard: {
        welcomeBack: {
          text: "Hi userName!",
        },
        button: {
          text: "Go to my dashboard",
        },
      },
    },
    auth: {
      signIn: {
        title: "Sign In",
        form: {
          email: {
            defaultValue: "",
            invalid: "Invalid email address",
            invalidDomain: "Email must end with @lsbu.ac.uk",
            empty: "Enter an email",
            regex: /@(gmail)\.com$/,
            // regex: /@(lsbu)\.ac.uk$/, TODO: update rules to use only @lsbu.ac.uk
            placeholder: "name@lsbu.ac.uk",
          },
          button: {
            submit: {
              text: "Sign In",
            },
            playground: {
              text: "Playground",
            },
          },
        },
        linkSent: {
          description1: "Email sent to",
          description2: ". Check your inbox and click the link in the email to sign in.",
          resendLink: "Send me another link",
          hideLinkSetComponent: "Change email",
        },
      },
    },
    unauthorized: {
      text: "Looks like you do not have permission to visit this page...",
      button: "Go to my dashboard",
    },
  },
};

export default content;
