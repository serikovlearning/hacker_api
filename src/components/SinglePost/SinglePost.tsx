import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchComments } from '../../store/slices/commentSlice';
import { fetchPostById } from '../../store/slices/postsSlice';
import Comments from '../Comments/Comments';
import Loader from '../Loader';
import { PostItem } from '../PostItem/PostItem';
import classes from './SinglePost.module.css'

const SinglePost: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { loading, postsId, post } = useAppSelector((state) => state.posts);
  const { comments } = useAppSelector((state) => state.comments);
  const dispatch = useAppDispatch();

  const getPostById = (): void => {
    dispatch(fetchPostById(parseInt(id)));
  };

  const getComments = () => {
    dispatch(fetchComments(parseInt(id)));
  };

  useEffect(() => {
    const searchId = postsId.find((comment) => comment === parseInt(id));
    if (!searchId) {
      getPostById();
      getComments();
    }
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={classes.post_wrapper}>
      <PostItem postType={'main'} postData={post} />
      <Comments comments={comments} post={post} getComments={getComments} />
    </div>
  );
};

export default SinglePost;
