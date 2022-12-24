const DEFAULT_ERROR_CODE = "ERR_INTERNAL_SERVER";

const getErrorByErrorMessage = (message: string) => {
  if (message.includes("Unique constraint failed on the fields: (`email`)")) {
    return getErrorMessageByCode("ERROR_USER_ALREADY_REGISTERED");
  }

  return null;
};

const getErrorMessageByCode = (code: string) => {
  let message = "";

  switch (code) {
    case "AUTHENTICATION_TOKEN_MISSING":
      message = "Authentication failed. The authentication token is missing from the headers.";
      break;
    case "ERROR_USER_ALREADY_REGISTERED":
      message = "The user is already registered.";
      break;
    case "ERROR_CREATING_USER":
      message = "Error creating the user.";
      break;
    case "PERMISSION_DENIED":
      message = "You do not have permission to execute the operation requested.";
      break;
    case DEFAULT_ERROR_CODE:
    default:
      message = "Internal server error.";
  }

  return {
    code,
    message,
  };
};

export { DEFAULT_ERROR_CODE, getErrorByErrorMessage, getErrorMessageByCode };
