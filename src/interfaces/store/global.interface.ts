import { IAuthInfo } from "../api/results/authinfo.interface";

type msgType = "info" | "success" | "error" | "warning" | "loading";
export interface IGlobalStore {
  modal: boolean;
  setModal: (modal: boolean) => void;
  header: boolean;
  setHeader: (header: boolean) => void;
  userInfo: IAuthInfo;
  setUserInfo: (info: IAuthInfo) => void;
  resetUserInfo: () => void;
  spin: boolean;
  setSpin: (spin: boolean) => void;
  msg: [msgType, string];
  sendMessage: (type: msgType, message: string) => void;
}
