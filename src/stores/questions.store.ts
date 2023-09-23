import { create } from "zustand";
import { IGlobalStore } from "../interfaces/store/global.interface";
import { IQuestionStore } from "../interfaces/store/question.interface";
import { IQuestionsStore } from "../interfaces/store/questions.interface";

export const useQuestionsStore = create<IQuestionsStore>((set) => ({
  isForm: true,
  setIsForm: (isForm: boolean) => set((state) => ({ isForm })),
  questionId: "",
  setQuestionId: (questionId: string) => set((state) => ({ questionId })),
}));
