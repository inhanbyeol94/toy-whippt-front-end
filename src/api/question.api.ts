import axios, { Axios, AxiosResponse } from "axios";
import { ICreateQuestionRoom } from "../interfaces/api/results/createQuestionRoom.interface";
import { IFindRecentQuestion } from "../interfaces/api/results/findRecentQuestion.interface";
import { IContinueQuestion } from "../interfaces/api/requests/continueQuestion.interface";
import { IFindOneQuestion } from "../interfaces/api/requests/findOneQuestion.interface";
import {
  IQuestion,
  IQuestionDetail,
} from "../interfaces/api/results/question.interface";

const server: Axios = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  withCredentials: true,
});

server.interceptors.response.use(
  (res) => res,
  async (err) => {
    const {
      config,
      response: { status },
    } = err;
    if (status === 401 && err.response.config.url !== "/auth/refresh") {
      const originRequest = config;

      const refreshAccessToken = await authRefresh();

      if (refreshAccessToken === "OK") {
        return axios(originRequest);
      }
      return Promise.reject(err);
    }
    return Promise.reject(err);
  },
);

export const authRefresh = async () => {
  const res = await server.get("/auth/refresh");
  return res.statusText;
};

export const createQuestionRoom = async () => {
  const res: AxiosResponse<ICreateQuestionRoom> = await server.post(
    "/questions",
  );
  return res.data;
};

export const findOneQuestion = async ({ questionId }: IFindOneQuestion) => {
  const res: AxiosResponse<IQuestion> = await server.get(
    "/questions/" + questionId,
  );
  return res.data;
};

export const findMyQuestions = async (page: number, keyword?: string) => {
  console.log(keyword);
  const res: AxiosResponse<[IQuestionDetail[], number]> = await server.get(
    `/question-details?page=${page}&keyword=${keyword || ""}`,
  );
  return res.data;
};

export const deleteQuestionRoom = async ({ questionId }: IFindOneQuestion) => {
  const res: AxiosResponse<IQuestion> = await server.delete(
    "/questions/" + questionId,
  );
  return res.data;
};

export const findRecentQuestionList = async (): Promise<
  IFindRecentQuestion[] | []
> => {
  const res: AxiosResponse<IFindRecentQuestion[], []> = await server.get(
    "/questions/recent",
  );
  return res.data;
};

export const continueQuestion = async (data: IContinueQuestion) => {
  const res: AxiosResponse<string> = await server.post(
    `/questions/${data.questionId}`,
    {
      library: data.library,
      topic: data.topic,
      type: data.type,
      query: data.query,
    },
  );
  return res.data;
};
