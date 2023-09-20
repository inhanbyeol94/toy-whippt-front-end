import { create } from "zustand";
import { IGlobalStore } from "../interfaces/store/global.interface";
import { IQuestionStore } from "../interfaces/store/question.interface";

export const useQuestionStore = create<IQuestionStore>((set) => ({
  question: {
    title: "",
    answer: "",
    createdAt: new Date(),
    nickname: "",
    topic: "",
    questionType: "",
    library: "",
    questionId: 0,
  },
  setQuestion: (question) => set((state) => ({ question })),
  resetQuestion: () =>
    set((state) => ({
      question: {
        title: "",
        answer: "",
        createdAt: new Date(),
        nickname: "",
        topic: "",
        questionType: "",
        library: "",
        questionId: 0,
      },
    })),
}));
