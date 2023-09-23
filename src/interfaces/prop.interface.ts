import {
  ICommunity,
  IQuestion,
  IQuestionStoreData,
} from "./api/results/question.interface";
import { IComment } from "./api/results/comment.interface";

export interface IProp {
  bgColor?: string;
  modalOpen?: boolean;
  children?: React.ReactNode;
  footer?: React.ReactNode[];
  questionData?: IQuestionStoreData;
  modalTitle?: string;
  communityData?: ICommunity;
  editCommentData?: {
    commentId: string;
    documentId: string;
    comment: string;
  };
}
