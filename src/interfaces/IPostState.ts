import { IPost } from "./IPost"

export interface IPostState {
  postsId: Array<number>
  postList: Array<IPost>
  post: IPost
  loading: boolean
  error: string | null
} 