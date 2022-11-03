import { IPost } from "./IPost";

export interface ICommentState {
  comments: Array<IPost>
  commentsLoading: boolean
  error: string | null
}