export interface IPost {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  comments: any[];
  user: any;
}

export interface IDocument {
  document?: string;
}

export interface IResultPosts {
  posts: IPost[];
  count: number;
}
