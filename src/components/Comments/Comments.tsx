import React from 'react';
import { IPost } from '../../interfaces/IPost';
import { useAppSelector } from '../../store/hooks';
import CommentsItem from '../CommentsItem/CommentsItem';
import Loader from '../Loader';
import classes from './Comments.module.css'

interface CommentsProps {
  getComments: () => void;
  comments: Array<IPost>;
  post: IPost;
}

const Comments: React.FC<CommentsProps> = ({ getComments, comments, post }) => {
  const { commentsLoading } = useAppSelector((state) => state.comments);

  if (commentsLoading) {
    return <Loader />;
  }
  return post.descendants !== 0 ? (
    <div className={classes.section_wrapper}>
      <button onClick={getComments}>Get comments</button>
      <h2 className={classes.title}>{post.descendants} comments</h2>
      {commentsLoading ? (
        <Loader />
      ) : (
        <div className={classes.wrapper}>
          {comments.map((comment) => (
            <CommentsItem comment={comment} isChild={false} key={comment.id} />
          ))}
        </div>
      )}
    </div>
  ) : null;
};

export default Comments;
