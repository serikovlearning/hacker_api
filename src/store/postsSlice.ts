import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPostsId, getPostById} from '../helpers/api'
import { IPost } from '../interfaces/IPost'
import { IPostState } from '../interfaces/IPostState';

const initialState: IPostState = {
  postsId: [],
  postList: []  ,
  post: {} as IPost,
  loading: false,
  error: null,
}

export const fetchPost = createAsyncThunk<Array<IPost>, undefined, {rejectValue: string}>(
  'posts/fetchPosts',
  async function(_: undefined, {rejectWithValue}) {
    try {
        const postsId = await getPostsId().then(res => res.slice(0, 100))
        const posts = await Promise.all(
          postsId.map(async (id) => {
            const response = await getPostById(id)  
            return response
          })
        )
        
        return posts;
    }
    catch(e) {
      return rejectWithValue(`${e}`)
    }
  }
)

export const fetchPostById = createAsyncThunk<IPost, number, {rejectValue: string}>(
  'posts/fetchPostsId',
  async function(id: number, {rejectWithValue}) {
    try {
      const response = await getPostById(id)
      return response
    }
    catch(e) {
      return rejectWithValue(`${e}`)
    }
  }
)


const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(fetchPost.pending, (state, action) => {
      state.loading = true
    })
    .addCase(fetchPost.fulfilled, (state, action) => {
      state.loading = false
      state.postList = action.payload
    })
    .addCase(fetchPost.rejected, (state, action) => {
      state.loading = false
      state.error = "Sorry, an error occurred while getting the ID"
    })

    .addCase(fetchPostById.pending, (state, action) => {
      state.loading = true
    })
    .addCase(fetchPostById.fulfilled, (state,action) => {
      state.loading = false
      state.post = action.payload
      state.postsId.push(action.payload.id)
    })
    .addCase(fetchPostById.rejected, (state, action) => {
      state.loading = false
      state.error = "Sorry, an error occurred while getting the News"
    })

  },
})

export default postsSlice.reducer;
