import { IDocument } from "./document.interface";

export interface ICreateComment extends IDocument {
  comment: string;
}
