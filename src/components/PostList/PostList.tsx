import { useEffect, useMemo, useState, memo } from 'react';
import { IPost } from '../../interfaces/IPost';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchPost } from '../../store/slices/postsSlice';
import { PostItem } from '../PostItem/PostItem';
import clasess from './PostList.module.css';
import CustomSelect from '../UI/CustomSelect/CustomSelect';


const MemoCustomSelect = memo(CustomSelect)

export const PostList: React.FC = () => {
  const { loading, postListAll } = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();

  const [sort, setSort] = useState<string>('date');

  const sortArray = [
    { value: 'date'},
    { value: 'score'},
  ];

  const sortedPosts: Array<IPost> = useMemo(() => {
    switch (sort) {
      case 'date':
        return [...postListAll].sort(
          (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
        );

      case 'score':
        return [...postListAll].sort((a, b) => b.score - a.score);

      default:
        return [...postListAll].sort(
          (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
        );
    }
  }, [sort, postListAll]);


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
        <MemoCustomSelect
          options={sortArray}
          onChange={(sort) => setSort(sort)}
          value={sort}
        />
      </div>
      {sortedPosts.map((post) => (
        <PostItem key={post.id} postType={'other'} postData={post}></PostItem>
      ))}
    </div>
  );
};
