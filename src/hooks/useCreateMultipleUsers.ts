import { AffectedRowsOutput } from "@generated/type-graphql";
import useSWR from "swr";

import { CREATE_MULTIPLE_USERS } from "@/queries/user";
import { fetcher } from "@/utils/fetcher";

interface UserData {
  email: string;
  name: string;
}

const useCreateUsers = (usersData: UserData[]) => {
  const { data, error } = useSWR(
    [
      CREATE_MULTIPLE_USERS,
      {
        data: usersData,
        skipDuplicates: true,
      },
    ],
    fetcher
  );

  return {
    data: data ? (data.createManyUser as AffectedRowsOutput) : undefined,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useCreateUsers;
