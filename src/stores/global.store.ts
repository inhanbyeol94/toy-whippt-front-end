import { create } from "zustand";
import { IGlobalStore } from "../interfaces/store/global.interface";

export const useGlobalStore = create<IGlobalStore>((set) => ({
  modal: false,
  setModal: (modal) => set((state) => ({ modal })),
}));
