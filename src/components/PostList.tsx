import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchPostsId, fetchPost } from '../store/postsSlice';
import { PostItem } from './PostItem';

interface PostItemProps {
  title?: string;
  score?: number;
  time?: string;
  url?: string;
}

export const PostList: React.FC<PostItemProps> = ({
  title,
  score,
  time,
  url,
}) => {
  const dispatch = useAppDispatch();
  const initPosts: Array<number> = [];

  const [posts, setPosts] = useState(initPosts);

  const { loading, postsId, postList } = useAppSelector((state) => state.posts);

  useEffect(() => {
    if (posts.length === 0 && postsId.length === 0) {
      dispatch(fetchPostsId());
    }

    return () => {
      console.log('second work');
      // console.log(postsId);
      
      setPosts(posts => [...posts, ...postsId])
    };
  }, [dispatch, postsId]);

  useEffect(() => {
    console.log(` special ${[...posts, ...postsId]}`);
    
  }, [postsId, posts])
  

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  } else if (postsId.length > 0) {
    return (
      <div>
        {postList.map((item) => (
          <PostItem key={item.id} postData={item}></PostItem>
        ))}
        {/* {<PostItem key={postsId[0]} id={[0]} />} */}
      </div>
    );
  }
  return <div>Waiting for mirror</div>;
};
