import { IUser } from "./user.interface";

export interface IQuestionStoreData {
  title: string;
  query: string;
  answer: string;
  createdAt: Date;
  name: string;
  profileImgUrl: string;
  topic: string;
  type: string;
  library: string;
  id: string;
}

export interface IQuestion {
  id: string;
  title: string;
  library: string;
  topic: string;
  type: string;
  createdAt: Date;
  user: any;
  questionDetails: IQuestionDetail[];
}

export interface IQuestionDetail {
  id: string;
  query: string;
  answer: string;
  library: string;
  topic: string;
  type: string;
  createdAt: Date;
  question: IQuestion;
}

export interface ICommunity {
  title: string;
  contents: string;
  communityId: number;
}
