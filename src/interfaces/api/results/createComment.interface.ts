export interface IResultCreateComment {
  user: {
    id: string;
  };
  post: {
    id: string;
  };
  comment: string;
  createdAt: string;
}
