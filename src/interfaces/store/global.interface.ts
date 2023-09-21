import { IAuthInfo } from "../api/results/authinfo.interface";

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
}
