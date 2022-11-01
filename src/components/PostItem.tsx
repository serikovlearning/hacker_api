import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import IPost from '../interfaces/IPost';
import { fetchPost } from '../store/postsSlice';

interface PostItemProps {
  postData: IPost;
}

export const PostItem: React.FC<PostItemProps> = (props) => {
  const dispatch = useAppDispatch();
  const { post, loading } = useAppSelector((state) => state.posts);
  const postData = props.postData;

  const initPost: IPost = {
    id: 0,
    time: new Date().getTime().toString(),
    title: '',
    by: '',
    rating: 0,
  };
  const [currentPost, setCurrentPost] = useState(initPost);

  const convertTime = (time: number) => {
    let date = new Date(time * 1000).toUTCString();
    return date;
  };

  useEffect(() => {
    // dispatch(fetchPost(id));
  }, []);

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div
      style={{
        border: '2px solid black',
        borderRadius: '20px',
        padding: '20px',
        margin: '50px auto',
        maxWidth: '700px',
      }}
    >
      <h2>{postData.title}</h2>
      <p>{postData.by}</p>
      <p>{postData.id}</p>
      <p>{convertTime(Number(postData.time))}</p>
    </div>
  );
};
