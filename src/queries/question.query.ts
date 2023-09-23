import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryClient } from "../App";
import {
  continueQuestion,
  createQuestionRoom,
  deleteQuestionRoom,
  findOneQuestion,
  findRecentQuestionList,
} from "../api/question.api";
import { IContinueQuestion } from "../interfaces/api/requests/continueQuestion.interface";
import { IFindOneQuestion } from "../interfaces/api/requests/findOneQuestion.interface";

export const useQuestionQueries = (questionId?: string) => {
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

  return {
    createQuestionRoomMutation,
    findRecentQuestionListQuery,
    findRecentQuestionListQueryLoading,
    findOneQuestionQuery,
    continueQuestionMutation,
    deleteQuestionMutation,
    isSuccess,
  };
};
