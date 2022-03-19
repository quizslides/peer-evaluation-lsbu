import { ApolloError } from "apollo-server-errors";
import { GraphQLError } from "graphql";

import { createUserError } from "@/pages/api/error/user";

const ErrorHandler = (error: GraphQLError) => {
  const defaultErrorMessage = "Internal server error";

  let errorMessage = defaultErrorMessage;

  if (error.path?.includes("createUser")) {
    errorMessage = createUserError(error.message);
  }

  if (process.env.NODE_ENV === "development") {
    const returnErrorMessage = errorMessage !== defaultErrorMessage ? errorMessage : error.message;

    return new ApolloError(returnErrorMessage, "ERR_INTERNAL_SERVER");
  }

  return new ApolloError(errorMessage, "ERR_INTERNAL_SERVER");
};

export default ErrorHandler;
