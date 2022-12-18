import routing from "@/routing";

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
    alert: {
      testId: "component-alert",
    },
  },
  containers: {
    errorContainer: {
      button: "Click here to refresh",
      text: "Sorry, something went wrong...",
    },
    404: {
      button: "Go Home",
      text: "Sorry, page not found",
      href: routing.home,
    },
    500: {
      button: "Go Home",
      text: "Sorry, something went wrong...",
      href: routing.home,
    },
    errorAuth: {
      button: "Try again",
      text: "Error....",
      href: routing.auth.signIn,
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
    peerEvaluationForm: {
      form: {
        title: {
          label: "Peer Evaluation title",
          placeholder: "Title of the peer evaluation",
        },
        code: {
          label: "Peer Evaluation code",
          placeholder: "Peer Evaluation code must be unique",
          helperText: "Peer Evaluation code must be unique, uppercase and only underscore is allowed between words",
        },
        peerEvaluationSchools: {
          label: "Schools peer evaluation",
          helperText: "Schools that the peer evaluation is part of",
        },
        peerEvaluationStatus: {
          label: "Status",
        },
        maxMarkIncrease: {
          label: "Max mark increase",
          helperText: "The max mark increase automatically by the system",
        },
        maxMarkDecrease: {
          label: "Max mark decrease",
          helperText: "The max mark decrease automatically by the system",
        },
        submissionsLockDate: {
          label: "Submissions lock date",
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
        emailSubjectReminder: {
          label: "Email title",
          placeholder: "Title of the reminder email",
        },
        emailBodyReminder: {
          helperText: "Email body of the reminder",
          resetButtonText: "Reset Email Body",
        },
        instructions: {
          helperText: "Instructions for the student",
          resetButtonText: "Reset",
        },
        scaleExplanation: {
          helperText: "Scale Explanation for the student",
          resetButtonText: "Reset",
        },
        columnManagement: {
          helperText: "List of columns of the peer evaluation",
        },
        peerEvaluationTeachingMembers: {
          helperText: "Teaching peer evaluation teaching members",
        },
        button: {
          submit: "submit",
          cancel: "cancel",
          viewOnlyGoBack: "Go Back",
        },
      },
      confirmationOnCancel: {
        title: "Cancel",
        bodyText: "If you cancel data all the will be lost. Are you sure you want to cancel?",
        acceptText: "OK",
        closeText: "Cancel",
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
    peerEvaluationEmailReminderForm: {
      form: {
        emailSubjectReminder: {
          label: "Email title",
          placeholder: "Title of the reminder email",
        },
        emailBodyReminder: {
          helperText: "Email body of the reminder",
          resetButtonText: "Reset Email Body",
        },

        button: {
          submit: "Save",
          send: "Send Reminder",
          cancel: "Cancel and go back",
          viewOnlyGoBack: "Go Back",
        },
      },
      confirmationOnCancel: {
        title: "Cancel",
        bodyText: "If you cancel data all the will be lost. Are you sure you want to cancel?",
        acceptText: "OK",
        closeText: "Cancel",
      },
    },
    peerEvaluationColumnManagement: {
      resetButton: "Reset",
      confirmationDeleteColumn: {
        title: "Delete column",
        bodyText: "Are you sure you want to delete the column?",
        acceptText: "OK",
        closeText: "Cancel",
      },
    },
    peerEvaluationTeachingMember: {
      resetButton: "Reset",
      confirmationDeleteColumn: {
        title: "Delete peer evaluation teaching member",
        bodyText: "Are you sure you want to delete the peer evaluation teaching member?",
        acceptText: "OK",
        closeText: "Cancel",
      },
    },
    peerEvaluationTeachingMemberForm: {
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
        role: {
          label: "Role",
          helperText: "Role of the lecturer in the peer evaluation",
          placeholder: "Role of the lecturer in the peer evaluation",
        },
        button: {
          submit: "submit",
          cancel: "cancel",
        },
      },
    },
    peerEvaluationsDataTable: {
      confirmationOnDelete: {
        title: "Are you really sure?",
        bodyText:
          "If you delete the peer evaluation all the related data will be lost! Are you sure you want to delete the peer evaluation?",
        acceptText: "Yes",
        closeText: "No",
      },
    },
    PeerEvaluationResultTeamCommentForm: {
      form: {
        comment: {
          label: "Comment",
          placeholder: "Comment of the team",
        },
        button: {
          submit: "Save",
          cancel: "Cancel",
        },
      },
    },
  },
  pages: {
    homePage: {
      title: "LSBU Peer Evaluation",
      subTitleTop: "Fairer Teamwork",
      subTitleBottom: "Assessment",
      signIn: {
        button: "Sign In",
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
    student: {
      peerEvaluations: {
        title: "Peer Evaluations",
      },
    },
  },
};

export default content;
