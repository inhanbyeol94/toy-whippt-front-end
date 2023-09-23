import { create } from "zustand";
import { IGlobalStore } from "../interfaces/store/global.interface";
import { IQuestionStore } from "../interfaces/store/question.interface";
import { IUser } from "../interfaces/api/results/user.interface";
import { IQuestion } from "../interfaces/api/results/question.interface";

export const useQuestionStore = create<IQuestionStore>((set) => ({
  question: {
    title: "",
    query: "",
    answer: "",
    createdAt: new Date(),
    name: "",
    profileImgUrl: "",
    topic: "",
    type: "",
    library: "",
    id: "",
  },
  setQuestion: (question) => set((state) => ({ question })),
  resetQuestion: () =>
    set((state) => ({
      question: {
        title: "",
        query: "",
        answer: "",
        createdAt: new Date(),
        name: "",
        profileImgUrl: "",
        topic: "",
        type: "",
        library: "",
        id: "",
      },
    })),
}));
