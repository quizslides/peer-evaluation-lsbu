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
          helperText: "Name format must follow 'last name, first name'",
        },
        role: {
          label: "Role",
          helperText: "The role of the user",
        },
        button: {
          submit: "submit",
          cancel: "cancel",
        },
      },
    },
    moduleForm: {
      form: {
        title: {
          label: "Module title",
          placeholder: "Title of the module",
        },
        moduleCode: {
          label: "Module code",
          placeholder: "Module code must be unique",
          helperText: "Module code must be unique, uppercase and only underscore is allowed between words",
        },
        moduleSchools: {
          label: "Schools module",
          helperText: "Schools that the module is part of",
        },
        moduleStatus: {
          label: "Status",
          helperText: "Status of the module peer evaluation",
        },
        maxGradeIncrease: {
          label: "Max grade increase",
          helperText: "The max grade increase automatically by the system",
        },
        maxGradeDecrease: {
          label: "Max grade decrease",
          helperText: "The max grade decrease automatically by the system",
        },
        submissionsLockDate: {
          label: "Submission lock date",
          helperText: "The date when the peer evaluations submissions will be locked automatically",
        },
        criteriaScoreRangeMin: {
          label: "Criteria Score Range Min",
          helperText: "Criteria Score Range Min",
        },
        criteriaScoreRangeMax: {
          label: "Criteria Score Range Max",
          helperText: "Criteria Score Range Max",
        },
        emailTitleReminder: {
          label: "Email title",
          placeholder: "Title of the reminder email",
        },
        emailBodyReminder: {
          helperText: "Email body of the reminder",
          resetButtonText: "Reset Email Body",
        },
        columnManagement: {
          helperText: "List of columns of the peer evaluation",
        },
        moduleMembers: {
          helperText: "Members of the module",
        },
        button: {
          submit: "submit",
          cancel: "cancel",
        },
      },
    },
    columnForm: {
      form: {
        description: {
          label: "Column description",
          helperText: "The description of the column",
          placeholder: "Description",
        },
        button: {
          submit: "submit",
          cancel: "cancel",
        },
      },
    },
    peerEvaluationColumnManagement: {
      resetButton: "Reset columns",
      confirmationDeleteColumn: {
        title: "Delete column",
        bodyText: "Are you sure you want to delete the column?",
        acceptText: "OK",
        closeText: "Cancel",
      },
    },
    moduleMember: {
      resetButton: "Reset module members",
      confirmationDeleteColumn: {
        title: "Delete module member",
        bodyText: "Are you sure you want to delete the module member?",
        acceptText: "OK",
        closeText: "Cancel",
      },
    },
    moduleMemberForm: {
      form: {
        email: {
          label: "Lecturer email",
          helperText: "The list only show lecturer users",
          placeholder: "Lecturer email",
        },
        name: {
          label: "Lecturer name",
          helperText: "",
          placeholder: "Lecturer name",
        },
        permission: {
          label: "Permission",
          helperText: "Permission of the lecturer in the module",
          placeholder: "Permission of the lecturer in the module",
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
          description2: "if it exists in the system. Check your inbox and click the link in the email to sign in.",
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
