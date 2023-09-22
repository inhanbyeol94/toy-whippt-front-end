import { create } from "zustand";
import { IEditPostStore } from "../interfaces/store/editPost.interface";
import { IEditPost } from "../interfaces/api/requests/editPost.interface";

export const useEditPostStore = create<IEditPostStore>((set) => ({
  postData: {
    title: "",
    content: "",
    postId: "",
  },
  setPostData: (postData: IEditPost) => set((state) => ({ postData })),
  resetPostData: () =>
    set((state) => ({
      postData: {
        title: "",
        content: "",
        postId: "",
      },
    })),
}));
