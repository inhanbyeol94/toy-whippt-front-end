import { IQuestion } from "./question.interface";
import { IStudyUser } from "./study.interface";

export interface IUser {
  id?: string;
  email?: string;
  name?: string;
  password?: string;
  profileImgUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
  posts?: Comment[];
  comments?: Comment[];
  questions?: IQuestion[];
  studyUsers?: IStudyUser[];
  sendMessages?: unknown[];
  receiveMessages?: unknown[];
}
