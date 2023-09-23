import axios, { Axios, AxiosResponse } from "axios";
import { IAuthInfo } from "../interfaces/api/results/authinfo.interface";
import { IResult } from "../interfaces/api/results/result.interface";

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
export const authInfo = async (): Promise<IAuthInfo> => {
  const res: AxiosResponse<IAuthInfo> = await server.get("/users");
  return res.data;
};

export const authRefresh = async () => {
  const res = await server.get("/auth/refresh");
  return res.statusText;
};

export const authLogout = async (): Promise<IResult> => {
  const res: AxiosResponse<IResult> = await server.delete("/auth/logout");
  return res.data;
};
