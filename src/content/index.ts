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
    userForm: {
      form: {
        email: {
          label: "Email",
          placeholder: "name@lsbu.ac.uk",
        },
        name: {
          label: "Name",
          placeholder: "Enter a name...",
        },
        role: {
          label: "RoleScope",
          helperText: "The role of the user",
        },
        button: {
          submit: "submit",
          cancel: "cancel",
        },
      },
    },
  },
  pages: {
    homePage: {
      title: "Peer Evaluation",
      signIn: {
        button: "Sign In",
      },
      playground: {
        button: "Playground",
      },
      dashboard: {
        welcomeBack: {
          text: "Hi userName!",
        },
        button: "Go to my dashboard",
      },
    },
    auth: {
      signIn: {
        title: "Sign In",
        form: {
          email: {
            defaultValue: "",
            placeholder: "name@lsbu.ac.uk",
          },
          button: {
            submit: "Sign In",
            playground: "Playground",
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
