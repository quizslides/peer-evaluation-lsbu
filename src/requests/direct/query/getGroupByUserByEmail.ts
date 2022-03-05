import { UserGroupBy } from "@generated/type-graphql";

import { GROUP_BY_USER } from "../../schema/user";

import { TApolloClientType } from "@/graphql/client";

const getGroupByUserByEmail = (apolloClient: TApolloClientType, emails: string[]) => {
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
