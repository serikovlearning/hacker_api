import React from 'react';
import { IPost } from '../../interfaces/IPost';
import { useAppSelector } from '../../store/hooks';
import CommentsItem from '../CommentsItem/CommentsItem';
import Loader from '../UI/Loader/Loader';
import classes from './Comments.module.scss'


interface CommentsProps {
  getComments: () => void;
  comments: Array<IPost>;
  post: IPost;
}

const Comments: React.FC<CommentsProps> = ({ getComments, comments, post }) => {
  const { commentsLoading } = useAppSelector((state) => state.comments);

  return post.descendants !== 0 ? (
    <div className={classes.section_wrapper}>
      <button className={classes.fetch_comments} onClick={getComments}>Get comments</button>
      <h2 className={classes.title}>{post.descendants} comments</h2>
      {commentsLoading ? (
        <div className={classes.wrapper}>
          <Loader size="small" />
        </div>
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
