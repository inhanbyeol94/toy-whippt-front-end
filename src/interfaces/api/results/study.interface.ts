import { IUser } from "./user.interface";

export interface IStudy {
  id: string;
  title?: string;
  content?: string;
  joinCount?: number;
  maxCount?: number;
  topic?: string;
  createdAt?: Date;
  updatedAt?: Date;
  studyUsers?: IStudyUser[];
}

export interface IStudyUser {
  id?: string;
  isHost?: boolean;
  study?: IStudy;
  user?: IUser;
}
