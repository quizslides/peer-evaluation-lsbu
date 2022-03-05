import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

import routing from "@/routing";
import { errorNotification } from "@/utils";

const httpLink = new HttpLink({
  uri: routing.backendEndpoint,
});

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    return forward(operation);
  }

  if (networkError) {
    errorNotification(`Connection error`);
  }
});

const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
});

export type TApolloClientType = ApolloClient<object>;

export default client;
