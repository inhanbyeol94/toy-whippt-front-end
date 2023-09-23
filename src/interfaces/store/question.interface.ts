import {
  IQuestion,
  IQuestionStoreData,
} from "../api/results/question.interface";

export interface IQuestionStore {
  question: IQuestionStoreData;
  setQuestion: (data: IQuestionStoreData) => void;
  resetQuestion: () => void;
}
