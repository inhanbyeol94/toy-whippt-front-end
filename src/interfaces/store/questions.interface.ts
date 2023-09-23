export interface IQuestionsStore {
  isForm: boolean;
  setIsForm: (isForm: boolean) => void;
  questionId: string;
  setQuestionId: (data: string) => void;
}
