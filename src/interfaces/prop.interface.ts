import {ICommunity, IQuestion} from "./api/results/question.interface";

export interface IProp {
  bgColor?: string;
  modalOpen?: boolean;
  children?: React.ReactNode;
  footer?: React.ReactNode[];
  questionData?: IQuestion;
  modalTitle?: string;
  communityData?: ICommunity;
}
