import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryClient } from "../App";
import {
  continueQuestion,
  createQuestionRoom,
  deleteQuestionRoom,
  findMyQuestions,
  findOneQuestion,
  findRecentQuestionList,
} from "../api/question.api";
import { IContinueQuestion } from "../interfaces/api/requests/continueQuestion.interface";
import { IFindOneQuestion } from "../interfaces/api/requests/findOneQuestion.interface";
import {
  IQuestion,
  IQuestionDetail,
} from "../interfaces/api/results/question.interface";

export const useQuestionQueries = (questionId?: string, keyword?: string) => {
  const createQuestionRoomMutation = useMutation(() => createQuestionRoom(), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["questionData", questionId]);
      queryClient.invalidateQueries(["findRecentQuestionList"]);
      return data;
    },
    onError: (error: AxiosError) => {
      return error;
    },
  });

  const {
    data: findRecentQuestionListQuery,
    isLoading: findRecentQuestionListQueryLoading,
  } = useQuery(["findRecentQuestionList"], () => findRecentQuestionList());

  const { data: findOneQuestionQuery, isSuccess } = useQuery(
    ["questionData", questionId],
    () => findOneQuestion({ questionId: questionId! }),
    {
      enabled: !!questionId,
    },
  );

  const continueQuestionMutation = useMutation(
    (data: IContinueQuestion) => continueQuestion(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["questionData", questionId]);
        return queryClient.invalidateQueries(["findRecentQuestionList"]);
      },
      onError: (error: AxiosError) => {
        return error;
      },
    },
  );

  const deleteQuestionMutation = useMutation(
    () => deleteQuestionRoom({ questionId: questionId! }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["questionData", questionId]);
        return queryClient.invalidateQueries(["findRecentQuestionList"]);
      },
      onError: (error: AxiosError) => {
        return error;
      },
    },
  );

  const {
    data: findMyQuestionsQuery,
    isSuccess: findMyQuestionsIsSuccess,
    hasNextPage: findMyQuestionsHasNextPage,
    fetchNextPage: findMyQuestionsFetchNextPage,
  } = useInfiniteQuery<
    [IQuestionDetail[], number],
    Error,
    [IQuestionDetail[], number]
  >(
    ["findMyQuestions", keyword],
    ({ pageParam = 1 }) => findMyQuestions(pageParam, keyword),
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage, allPages) => {
        const maxPage = Math.ceil(lastPage[1] / 10);
        const nextPage = allPages.length + 1;
        return nextPage <= maxPage ? nextPage : null;
      },
    },
  );

  return {
    createQuestionRoomMutation,
    findRecentQuestionListQuery,
    findRecentQuestionListQueryLoading,
    findOneQuestionQuery,
    continueQuestionMutation,
    deleteQuestionMutation,
    isSuccess,
    findMyQuestionsQuery,
    findMyQuestionsIsSuccess,
    findMyQuestionsHasNextPage,
    findMyQuestionsFetchNextPage,
  };
};
