const createUserError = (errorMessage: string) => {
  if (errorMessage.includes("Unique constraint")) {
    return "User is already registered";
  }

  return "Error on createUser";
};

export { createUserError };
