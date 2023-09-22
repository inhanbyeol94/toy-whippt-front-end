import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { authInfo, authLogout, authRefresh } from "../api/auth.api";
import { IResult } from "../interfaces/api/results/result.interface";
import { AxiosError } from "axios";
import { queryClient } from "../App";
import {
  createComment,
  createPost,
  deleteComment,
  deletePost,
  editComment,
  editPost,
  getComments,
  getPost,
  getPosts,
} from "../api/post.api";
import { ICreatePost } from "../interfaces/api/requests/createPost.interface";
import { IResultCreatePost } from "../interfaces/api/results/createPost.interface";
import {
  IDocument,
  IPost,
  IResultPosts,
} from "../interfaces/api/requests/document.interface";
import { ICreateComment } from "../interfaces/api/requests/createComment.interface";
import { IResultCreateComment } from "../interfaces/api/results/createComment.interface";
import { IDeleteComment } from "../interfaces/api/requests/deleteComment.interface";
import { IEditComment } from "../interfaces/api/requests/editComment.interface";
import { IDeletePost } from "../interfaces/api/requests/deletePost.interface";
import { IEditPost } from "../interfaces/api/requests/editPost.interface";
import { getNextPageParam } from "react-query/types/core/infiniteQueryBehavior";

export const usePostQueries = (document?: string, keyword?: string) => {
  /* Post */
  const newPost = useMutation((data: ICreatePost) => createPost(data), {
    onSuccess: (result: IResultCreatePost) => {
      return result;
    },
    onError: (error: AxiosError) => {
      return error;
    },
  });

  const delPostMutation = useMutation((data: IDeletePost) => deletePost(data), {
    onSuccess: (result: IResult) => {
      return result;
    },
    onError: (error: AxiosError) => {
      return error;
    },
  });

  const editPostMutation = useMutation((data: IEditPost) => editPost(data), {
    onSuccess: (result: IResult) => {
      return result;
    },
    onError: (error: AxiosError) => {
      return error;
    },
  });

  const { data: getPostData } = useQuery(
    ["getPost"],
    () => getPost({ document }),
    {
      enabled: !!document,
    },
  );

  const {
    data: getPostsData,
    hasNextPage,
    fetchNextPage,
    isLoading: postsIsLoading,
    isFetching: postsIsFetching,
  } = useInfiniteQuery<[IPost[], number], Error, [IPost[], number]>(
    ["getPosts"],
    ({ pageParam = 1 }) => getPosts(pageParam, keyword),
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage, allPages) => {
        const maxPage = Math.ceil(lastPage[1] / 10);
        const nextPage = allPages.length + 1;
        return nextPage <= maxPage ? nextPage : null;
      },
    },
  );

  /* Comment */

  const { data: getCommentsData } = useQuery(
    ["comments"],
    () => getComments({ document }),
    {
      enabled: !!document,
    },
  );

  const newComment = useMutation(
    (data: ICreateComment) => createComment(data),
    {
      onSuccess: (result: IResultCreateComment) => {
        queryClient.invalidateQueries(["comments"]);
        return result;
      },
      onError: (error: AxiosError) => {
        return error;
      },
    },
  );

  const deleteCommentMutation = useMutation(
    (data: IDeleteComment) => deleteComment(data),
    {
      onSuccess: (result: IResult) => {
        queryClient.invalidateQueries(["comments"]);
        return result;
      },
      onError: (error: AxiosError) => {
        return error;
      },
    },
  );

  const editCommentMutation = useMutation(
    (data: IEditComment) => editComment(data),
    {
      onSuccess: (result: IResult) => {
        queryClient.invalidateQueries(["comments"]);
        return result;
      },
      onError: (error: AxiosError) => {
        return error;
      },
    },
  );

  return {
    newPost,
    getPostData,
    getPostsData,
    newComment,
    getCommentsData,
    deleteCommentMutation,
    editCommentMutation,
    delPostMutation,
    editPostMutation,
    hasNextPage,
    fetchNextPage,
    postsIsLoading,
    postsIsFetching,
  };
};
