const validatorContent = {
  userEmail: {
    defaultValue: "",
    invalid: "Invalid email address",
    invalidDomain: "Email must end with @lsbu.ac.uk",
    required: "Enter an email",
    regex: /@((gmail)\.com|(lsbupeerevaluation)\.software|(lsbu)\.ac.uk)$/,
    // regex: /@(lsbu)\.ac.uk$/, TODO: update rules to use only @lsbu.ac.uk and @lsbupeerevaluation.software
    placeholder: "name@lsbu.ac.uk",
  },
  userName: {
    required: "Name is required",
    minLength: "Name must be longer than one character",
    maxLength: "Name cannot be longer than 70 characters",
  },
  userRole: {
    required: "Select a role",
    oneOf: "Invalid role entered",
  },
  moduleTitle: {
    required: "Module title is required",
    minLength: "Module title must be longer than one character",
    maxLength: "Module title cannot be longer than 70 characters",
  },
  moduleCode: {
    required: "Module code is required",
    minLength: "Module code must be longer than one character",
    maxLength: "Module code cannot be longer than 20 characters",
  },
  moduleSchools: {
    required: "A school is required",
    minLength: "At least one school is required",
  },
  moduleStatus: {
    required: "Status module is required",
    oneOf: "Invalid status",
  },
  maxGradeIncrease: {
    typeError: "Please enter a number",
    required: "Max grade increase is required",
    min: "Max grade increase min value is 0",
    max: "Max grade increase max value is higher than max value",
  },
  maxGradeDecrease: {
    typeError: "Please enter a number",
    required: "Max grade decrease is required",
    min: "Max grade decrease min value is 0",
    max: "Max grade decrease max value is higher than max value",
  },
  submissionsLockDate: {
    min: "Start date must be from tomorrow",
  },
  criteriaScoreRangeMin: {
    typeError: "Please enter a number",
    required: "Criteria score range min is required",
    min: "Criteria score range min value is 0",
    max: "Criteria score range min value is higher than max value",
  },
  criteriaScoreRangeMax: {
    typeError: "Please enter a number",
    required: "Criteria score range max is required",
    min: "Criteria score range max must be higher than criteria score range min value",
    max: "Criteria score range min value is higher than max value",
  },
  reminderEmailTitle: {
    matchModuleCodeRegex: /{{moduleCode}}/,
    matchModuleCode: "Email title must contain {{moduleCode}}",
    required: "Email title is required",
    minLength: "Email title must be longer than one character",
    maxLength: "Email title cannot be longer than 70 characters",
  },
  reminderEmailBody: {
    matchUrlRegex: /{{peerEvaluationUrl}}/,
    matchUrl: "Email body must contain {{peerEvaluationUrl}} for the URL of the peer evaluation",
  },
  column: {
    required: "Column is required",
    minLength: "Column must be longer than one character",
    maxLength: "Column cannot be longer than 70 characters",
  },
  columns: {
    minLength: "One Column is required in the peer evaluation",
  },
  moduleMembers: {
    minLength: "One module member is required in the module",
  },
  moduleMemberPermission: {
    required: "Select a permission for the module member",
    oneOf: "Invalid permission entered",
  },
};

export default validatorContent;
