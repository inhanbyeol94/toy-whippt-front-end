import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { createStudy, getStudies, getStudy } from "../api/study.api";
import { ICreateStudy } from "../interfaces/api/requests/createStudy.interface";
import { IStudy } from "../interfaces/api/results/study.interface";
import { AxiosError } from "axios/index";
import { IApiResult } from "../interfaces/api/results/apiResult.interface";

export const useStudyQueries = (keyword?: string, studyId?: string) => {
  const createStudyMutation = useMutation(
    (data: ICreateStudy) => createStudy(data),
    {
      onSuccess: () => {
        //
      },
      onError: (error: AxiosError<IApiResult>) => {
        return error;
      },
    },
  );

  const {
    data: getStudiesQuery,
    hasNextPage: getStudiesHasNextPage,
    fetchNextPage: getStudiesFetchNextPage,
    isSuccess: getStudiesIsSuccess,
    refetch: getStudiesRefetch,
  } = useInfiniteQuery<[IStudy[], number], Error, [IStudy[], number]>(
    ["getStudies", keyword],
    ({ pageParam = 1 }) => getStudies(pageParam, keyword),
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage, allPages) => {
        const maxPage = Math.ceil(lastPage[1] / 10);
        const nextPage = allPages.length + 1;
        return nextPage <= maxPage ? nextPage : null;
      },
    },
  );

  const { data: getStudyQuery, isLoading: getStudyQueryIsLoading } = useQuery(
    ["getStudy"],
    () => getStudy(studyId!),
    {
      refetchOnWindowFocus: false,
      enabled: !!studyId,
    },
  );

  return {
    createStudyMutation,
    getStudiesQuery,
    getStudiesHasNextPage,
    getStudiesFetchNextPage,
    getStudiesIsSuccess,
    getStudiesRefetch,
    getStudyQuery,
    getStudyQueryIsLoading,
  };
};
