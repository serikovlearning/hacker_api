import React, { useEffect } from 'react';
import { PostList } from '../components/PostList/PostList';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchPost } from '../store/slices/postsSlice';

const PostsPage: React.FC = () => {
  const {postListAll} = useAppSelector(state => state.posts)
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (postListAll.length === 0)
    dispatch(fetchPost('newstories'));
  }, []);

  return (
    <div>
      <PostList />
    </div>
  );
};

export default PostsPage;
