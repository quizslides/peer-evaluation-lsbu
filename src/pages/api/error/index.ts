import { ApolloError } from "apollo-server-errors";
import { GraphQLError } from "graphql";

import { getErrorByErrorMessage, getErrorMessageByCode } from "@/pages/api/error/list";

const ErrorHandler = (error: GraphQLError) => {
  if (process.env.NODE_ENV === "development") {
    return error;
  }

  const errorByErrorMessage = getErrorByErrorMessage(error.message);

  if (errorByErrorMessage) {
    const { code, message } = errorByErrorMessage;
    return new ApolloError(message, code);
  }

  const { code, message } = getErrorMessageByCode(error.extensions?.code);

  return new ApolloError(message, code);
};

export default ErrorHandler;
