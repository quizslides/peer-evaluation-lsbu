import { ApolloClient } from "@apollo/client";
import { UserGroupBy } from "@generated/type-graphql";

import { GROUP_BY_USER } from "../../schema/user";

const getGroupByUserByEmail = (apolloClient: ApolloClient<object>, emails: string[]) => {
  return apolloClient.query<{ groupByUser: [UserGroupBy] }>({
    query: GROUP_BY_USER,
    errorPolicy: "all",
    fetchPolicy: "no-cache",
    variables: {
      by: "email",
      where: {
        email: {
          in: emails,
        },
      },
    },
  });
};

export default getGroupByUserByEmail;
