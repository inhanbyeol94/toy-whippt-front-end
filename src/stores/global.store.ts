import { create } from "zustand";
import { IGlobalStore } from "../interfaces/store/global.interface";
import { IAuthInfo } from "../interfaces/api/results/authinfo.interface";

export const useGlobalStore = create<IGlobalStore>((set) => ({
  modal: false,
  setModal: (modal) => set((state) => ({ modal })),
  header: false,
  setHeader: (header: boolean) => set((state) => ({ header })),
  userInfo: {
    id: "",
    email: "",
    name: "",
    profileImgUrl: "",
  },
  setUserInfo: (userInfo: IAuthInfo) => set((state) => ({ userInfo })),
  resetUserInfo: () =>
    set((state) => ({
      userInfo: {
        id: "",
        email: "",
        name: "",
        profileImgUrl: "",
      },
    })),
  spin: true,
  setSpin: (spin: boolean) => set((state) => ({ spin })),
  msg: ["info", ""],
  sendMessage: (type, message) => set((state) => ({ msg: [type, message] })),
}));
