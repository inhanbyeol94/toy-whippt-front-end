import axios, { Axios, AxiosResponse } from "axios";
import { authRefresh } from "./auth.api";
import { ICreateStudy } from "../interfaces/api/requests/createStudy.interface";
import { IQuestionDetail } from "../interfaces/api/results/question.interface";
import { IResult } from "../interfaces/api/results/result.interface";
import { IStudy } from "../interfaces/api/results/study.interface";

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

export const createStudy = async (data: ICreateStudy) => {
  const res: AxiosResponse<IResult> = await server.post(`/studies`, data);
  return res.data;
};

export const getStudies = async (pageParam: number, keyword?: string) => {
  const res: AxiosResponse<[IStudy[], number]> = await server.get(
    `/studies?page=${pageParam}&keyword=${keyword || ""}`,
  );
  return res.data;
};

export const getStudy = async (studyId: string) => {
  const res: AxiosResponse<IStudy> = await server.get(
    `/studies/details/${studyId}`,
  );
  return res.data;
};
