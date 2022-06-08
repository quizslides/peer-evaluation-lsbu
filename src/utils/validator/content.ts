const validatorContent = {
  userEmail: {
    defaultValue: "",
    invalid: "Invalid email address",
    invalidDomainRegex: "Email must end with @lsbu.ac.uk",
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
  peerEvaluationTitle: {
    required: "Peer Evaluation title is required",
    minLength: "Peer Evaluation title must be longer than one character",
    maxLength: "Peer Evaluation title cannot be longer than 70 characters",
  },
  code: {
    required: "Peer Evaluation code is required",
    minLength: "Peer Evaluation code must be longer than one character",
    maxLength: "Peer Evaluation code cannot be longer than 20 characters",
    unique: "Peer Evaluation code must be unique",
    regex: /^[A-Z0-9]+(?:_[A-Z0-9]+)*$/,
    messageRegex: "Uppercase and underscores allowed between words",
  },
  peerEvaluationSchools: {
    required: "A school is required",
    minLength: "At least one school is required",
  },
  peerEvaluationStatus: {
    required: "Status peerEvaluation is required",
    oneOf: "Invalid status",
  },
  maxMarkIncrease: {
    typeError: "Please enter a number",
    required: "Max mark increase is required",
    min: "Max mark increase min value is 0",
    max: "Max mark increase max value is higher than max value",
  },
  maxMarkDecrease: {
    typeError: "Please enter a number",
    required: "Max mark decrease is required",
    min: "Max mark decrease min value is 0",
    max: "Max mark decrease max value is higher than max value",
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
  emailSubjectReminder: {
    matchPeerEvaluationCodeRegex: /{{code}}/,
    matchPeerEvaluationCode: "Email title must contain {{code}}",
    required: "Email title is required",
    minLength: "Email title must be longer than one character",
    maxLength: "Email title cannot be longer than 70 characters",
  },
  emailBodyReminder: {
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
  peerEvaluationTeachingMembers: {
    minLength: "One owner of the peerEvaluation is required",
  },
  peerEvaluationTeachingMemberRole: {
    required: "Select a role for the peerEvaluation teaching member",
    oneOf: "Invalid role entered",
  },
  peerEvaluationResultTeamCommentFormComment: {
    maxLength: "Comment cannot be longer than 1000 characters",
  },
};

export default validatorContent;
