const validatorContent = {
  email: {
    defaultValue: "",
    invalid: "Invalid email address",
    invalidDomain: "Email must end with @lsbu.ac.uk",
    required: "Enter an email",
    regex: /@(gmail)\.com$/,
    // regex: /@(lsbu)\.ac.uk$/, TODO: update rules to use only @lsbu.ac.uk
    placeholder: "name@lsbu.ac.uk",
  },
  name: {
    required: "Name is required",
    maxLength: "Name cannot be longer than 70 characters",
  },
  role: {
    required: "Select a role",
    oneOf: "Invalid role entered",
  },
};

export default validatorContent;
