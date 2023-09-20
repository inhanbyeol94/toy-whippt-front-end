import { IQuestion } from "../api/results/question.interface";

export interface IQuestionStore {
  question: IQuestion;
  setQuestion: (data: IQuestion) => void;
  resetQuestion: () => void;
}
