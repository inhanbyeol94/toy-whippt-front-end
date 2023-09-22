import axios, { Axios, AxiosResponse } from "axios";
import { IAuthInfo } from "../interfaces/api/results/authinfo.interface";
import { IResult } from "../interfaces/api/results/result.interface";
import { ICreatePost } from "../interfaces/api/requests/createPost.interface";
import { IResultCreatePost } from "../interfaces/api/results/createPost.interface";
import {
  IDocument,
  IPost,
  IResultPosts,
} from "../interfaces/api/requests/document.interface";
import { ICreateComment } from "../interfaces/api/requests/createComment.interface";
import { IResultCreateComment } from "../interfaces/api/results/createComment.interface";
import { IComment } from "../interfaces/api/results/comment.interface";
import { IDeleteComment } from "../interfaces/api/requests/deleteComment.interface";
import { IEditComment } from "../interfaces/api/requests/editComment.interface";
import { IDeletePost } from "../interfaces/api/requests/deletePost.interface";
import { IEditPost } from "../interfaces/api/requests/editPost.interface";

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
const authRefresh = async () => {
  const res = await server.get("/auth/refresh");
  return res.statusText;
};

export const createPost = async (
  data: ICreatePost,
): Promise<IResultCreatePost> => {
  const res: AxiosResponse<IResultCreatePost> = await server.post(
    "/posts",
    data,
  );
  return res.data;
};

export const getPosts = async (
  pageParam: number,
  keyword?: string,
): Promise<[IPost[], number]> => {
  const res: AxiosResponse<[IPost[], number]> = await server.get(
    `/posts?keyword=${keyword || ""}&page=${pageParam}`,
  );

  return res.data;
};

export const getPost = async ({
  document,
}: IDocument): Promise<IResultCreatePost> => {
  const res: AxiosResponse<IResultCreatePost> = await server.get(
    `/posts/${document}`,
  );
  return res.data;
};

export const deletePost = async ({ postId }: IDeletePost): Promise<IResult> => {
  const res: AxiosResponse<IResult> = await server.delete(`/posts/${postId}`);
  return res.data;
};

export const editPost = async (data: IEditPost): Promise<IResult> => {
  const res: AxiosResponse<IResult> = await server.put(
    `/posts/${data.postId}`,
    {
      title: data.title,
      content: data.content,
    },
  );
  return res.data;
};

export const getComments = async ({
  document,
}: IDocument): Promise<IComment[]> => {
  const res: AxiosResponse<IComment[]> = await server.get(
    `/${document}/comments`,
  );
  return res.data;
};

export const createComment = async (
  data: ICreateComment,
): Promise<IResultCreateComment> => {
  const res: AxiosResponse<IResultCreateComment> = await server.post(
    `/${data.document}/comments`,
    { comment: data.comment },
  );
  return res.data;
};

export const deleteComment = async (data: IDeleteComment): Promise<IResult> => {
  const res: AxiosResponse<IResult> = await server.delete(
    `/${data.documentId}/comments/${data.commentId}`,
  );
  return res.data;
};

export const editComment = async (data: IEditComment): Promise<IResult> => {
  const res: AxiosResponse<IResult> = await server.put(
    `/${data.documentId}/comments/${data.commentId}`,
    { comment: data.comment },
  );
  return res.data;
};
