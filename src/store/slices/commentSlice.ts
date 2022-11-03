import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPostById } from '../../helpers/api';
import { IPost } from '../../interfaces/IPost';
import { ICommentState } from '../../interfaces/ICommentState';

const initialState: ICommentState = {
  comments: [],
  commentsLoading: false,
  error: null,
};

export const fetchComments = createAsyncThunk<
  Array<IPost>,
  number,
  { rejectValue: string }
>('comments/fetchComments', async function (id: number, { rejectWithValue }) {
  try {
    const response = await getPostById(id);
    const comments = await Promise.all(
      response?.kids.map(async (kid) => {
        const response = await getPostById(kid);
        return response;
      })
    );
    return comments;
  } catch (e) {
    return rejectWithValue(`${e}`);
  }
});

const commentsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchComments.pending, (state, action) => {
        state.commentsLoading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.commentsLoading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.commentsLoading = false;
        state.error = 'Sorry, an error occurred while getting the comments';
      });
  },
});

export default commentsSlice.reducer;
