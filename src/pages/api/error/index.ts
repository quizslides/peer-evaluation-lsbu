import { ApolloError } from "apollo-server-errors";
import { GraphQLError } from "graphql";

const createUserError = (errorMessage: string) => {
  if (errorMessage.includes("Unique constraint")) {
    return "User is already registered";
  }

  return "Error on createUser";
};

const ErrorHandler = (error: GraphQLError) => {
  if (process.env.NODE_ENV === "development") {
    return new ApolloError(error.message, "ERR_INTERNAL_SERVER");
  }

  let errorMessage = "Internal server error";

  if (error.path?.includes("createUser")) {
    errorMessage = createUserError(error.message);
  }

  return new ApolloError(errorMessage, "ERR_INTERNAL_SERVER");
};

export default ErrorHandler;
