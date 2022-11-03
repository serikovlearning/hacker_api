import { useEffect } from 'react';
import { IPost } from '../../interfaces/IPost';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchPost } from '../../store/slices/postsSlice';
import Loader from '../Loader';
import { PostItem } from '../PostItem/PostItem';
import clasess from './PostList.module.css'

export const PostList: React.FC = () => {
  const { loading, postListAll } = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();

  const sortedPostByTime: Array<IPost> = [...postListAll].sort(
    (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
  );

  useEffect(() => {
    let timer = setTimeout(function tick() {
      dispatch(fetchPost());
      timer = setTimeout(tick, 60000);
    }, 60000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={clasess.posts_wrapper}>
      <button onClick={() => dispatch(fetchPost())}>Update post list</button>
      {sortedPostByTime.map((post) => (
        <PostItem key={post.id} postType={'other'} postData={post}></PostItem>
      ))}
    </div>
  );
};
