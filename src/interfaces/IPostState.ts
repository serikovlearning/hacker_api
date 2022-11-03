import { IPost } from "./IPost"

export interface IPostState {
  postsId: Array<number>
  postListAll: Array<IPost>
  post: IPost
  loading: boolean
  error: string | null
} 