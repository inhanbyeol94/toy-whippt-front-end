import { ICreatePost } from "./createPost.interface";

export interface IEditPost extends ICreatePost {
  postId: string;
}
