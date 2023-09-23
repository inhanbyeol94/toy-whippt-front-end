export interface IComment {
  id: string;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  post: any;
  user: any;
}
