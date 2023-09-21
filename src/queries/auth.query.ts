import { useMutation, useQuery } from "@tanstack/react-query";
import { authInfo, authLogout, authRefresh } from "../api/auth.api";
import { IResult } from "../interfaces/api/results/result.interface";
import { AxiosError } from "axios";
import { queryClient } from "../App";

export const useAuthQueries = () => {
  const {
    data: userInfoData,
    isError,
    isLoading,
    isFetching,
    refetch,
  } = useQuery(["userinfo"], () => authInfo(), {
    refetchOnWindowFocus: false,
    retry: 0,
  });

  const logout = useMutation(() => authLogout(), {
    onSuccess: (result: IResult) => {
      return result;
    },
    onError: (error: AxiosError) => {
      return error;
    },
  });

  return {
    userInfoData,
    logout,
    refetch,
    isError,
    isFetching,
    isLoading,
  };
};
