export interface IQuestion {
  title: string;
  answer: string;
  createdAt: Date;
  nickname: string;
  topic: string;
  questionType: string;
  library: string;
  questionId: number;
}

export interface ICommunity {
  title: string;
  contents: string;
  communityId: number;
}
