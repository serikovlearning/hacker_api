import { useEffect, useState } from 'react';
import { IPost } from '../../interfaces/IPost';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchPost } from '../../store/slices/postsSlice';
import { PostItem } from '../PostItem/PostItem';
import clasess from './PostList.module.css';
import CustomSelect from '../UI/CustomSelect/CustomSelect';

export const PostList: React.FC = () => {
  const { loading, postListAll } = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();

  const [sort, setSort] = useState('date');

  const sortArray = [
    {value: 'date', text: 'Sort by date'},
    {value: 'score', text: 'Sort by score'}
  ]

  const sortedPostByDate: Array<IPost> = [...postListAll].sort(
    (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
  );
  const sortedPostByScore: Array<IPost> = [...postListAll].sort(
    (a, b) => b.score - a.score
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
    return <div></div>;
  }
  return (
    <div className={clasess.posts_wrapper}>
      <div className={clasess.posts__config}>
        <button onClick={() => dispatch(fetchPost())}>Update post list</button>
        <CustomSelect 
          options={sortArray} 
          onChange={sort => setSort(sort)}
          value={sort}
        />
      </div>
      {
        sort === 'date' 
        ? sortedPostByDate.map((post) => (
          <PostItem key={post.id} postType={'other'} postData={post}></PostItem>
        ))
        : sortedPostByScore.map((post) => (
          <PostItem key={post.id} postType={'other'} postData={post}></PostItem>
        ))
      }

    </div>
  );
};
