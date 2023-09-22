export interface IResultCreatePost {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  user: {
    id: string;
    name: string;
  };
}
