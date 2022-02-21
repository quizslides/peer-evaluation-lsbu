import { User } from "@generated/type-graphql";
import useSWR from "swr";

import { GET_USERS } from "@/queries/user";
import { fetcher } from "@/utils/fetcher";

const useGetUsers = () => {
  const { data, error } = useSWR([GET_USERS], fetcher);

  return {
    data: data ? (data.users as [User]) : undefined,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useGetUsers;
