import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './slices/postsSlice'
import commentsReducer from './slices/commentSlice'

const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
  },
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch