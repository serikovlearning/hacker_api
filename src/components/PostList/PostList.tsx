import { useEffect, useMemo, useState, memo } from 'react';
import { IPost } from '../../interfaces/IPost';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchPost } from '../../store/slices/postsSlice';
import { PostItem } from '../PostItem/PostItem';
import clasess from './PostList.module.css';
import CustomSelect from '../UI/CustomSelect/CustomSelect';

const MemoCustomSelect = memo(CustomSelect);

export const PostList: React.FC = () => {
  const { loading, postListAll } = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();

  const [sort, setSort] = useState<'date' | 'score'>('date');
  const [postType, setPostType] = useState<string>('newstories');

  const sortPostList = [{ value: 'date' }, { value: 'score' }];
  const sortPostType = [{ value: 'newstories' }, { value: 'topstories' }, {value: 'beststories'}];

  const sortedPosts: Array<IPost> = useMemo(() => {
    switch (sort) {
      case 'date':
        return [...postListAll].sort(
          (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
        );

      case 'score':
        return [...postListAll].sort((a, b) => b.score - a.score);

    }
  }, [sort, postListAll]);

  const updatePostType = (postType: string): void => {
    setPostType(postType)
    dispatch(fetchPost(postType))
  }

  useEffect(() => {
    let timer = setTimeout(function tick() {
      dispatch(fetchPost(postType));
      timer = setTimeout(tick, 60000);
    }, 60000);

    return () => {
      clearTimeout(timer);
    };
  }, [postType]);


  if (loading) {
    return <div></div>;
  }

  return (
    <div className={clasess.posts_wrapper}>
      <div className={clasess.posts__config}>
        <button onClick={() => dispatch(fetchPost(postType))}>Update post list</button>
        <MemoCustomSelect
          options={sortPostType}
          onChange={updatePostType}
          value={postType}
        />
        <MemoCustomSelect
          options={sortPostList}
          onChange={(sort) => setSort(sort as 'date' | 'score')}
          value={sort}
        />
      </div>
      {sortedPosts.map((post) => (
        <PostItem key={post.id} postType={'other'} postData={post}></PostItem>
      ))}
    </div>
  );
};
