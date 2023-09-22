import { ICreatePost } from "../api/requests/createPost.interface";
import { IEditPost } from "../api/requests/editPost.interface";

export interface IEditPostStore {
  postData: IEditPost;
  setPostData: (postData: IEditPost) => void;
  resetPostData: () => void;
}
