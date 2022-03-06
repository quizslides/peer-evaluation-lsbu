const validatorContent = {
  email: {
    defaultValue: "",
    invalid: "Invalid email address",
    invalidDomain: "Email must end with @lsbu.ac.uk",
    required: "Enter an email",
    regex: /@((gmail)\.com|(lsbupeerevaluation)\.software|(lsbu)\.ac.uk)$/,
    // regex: /@(lsbu)\.ac.uk$/, TODO: update rules to use only @lsbu.ac.uk and @lsbupeerevaluation.software
    placeholder: "name@lsbu.ac.uk",
  },
  name: {
    required: "Name is required",
    minLength: "Name must be longer than one character",
    maxLength: "Name cannot be longer than 70 characters",
  },
  role: {
    required: "Select a role",
    oneOf: "Invalid role entered",
  },
};

export default validatorContent;
