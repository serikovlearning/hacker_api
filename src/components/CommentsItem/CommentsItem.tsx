import React, { useState, memo } from 'react';
import { getPostById } from '../../helpers/api';
import { IPost } from '../../interfaces/IPost';
import classes from './CommentsItem.module.css';
import { ReactComponent as Cross } from '../../img/cross.svg';
import { ReactComponent as Author } from '../../img/author.svg';
import { useAppSelector } from '../../store/hooks';
import Loader from '../UI/Loader/Loader';

interface CommentItemProps {
  comment: IPost;
  isChild: boolean;
}

const CommentsItem: React.FC<CommentItemProps> = ({
  comment,
  isChild,
}): JSX.Element => {
  const [childs, setChilds] = useState<Array<IPost>>([]);
  const [childVisibile, setChildVisibile] = useState<boolean>(false);
  const [childsLoading, setChildsLoading] = useState<boolean>(false);

  const fetchCommentKids = async (): Promise<void> => {
    if (comment.kids?.length > 0 && !childVisibile) {
      setChildsLoading(true);

      const response = await Promise.all(
        comment.kids?.map(async (kid) => {
          const res = await getPostById(kid);
          return res;
        })
      );
      setChildsLoading(false);
      setChilds([...response]);
      setChildVisibile(true);
    } else {
      setChilds([]);
      setChildVisibile(false);
    }
  };
  if (comment.deleted) {
    return (
      <div className={isChild ? classes.child : ''} key={comment.id}>
        <div className={classes.content_item}>
          <Cross className={classes.svg_icon} />
          <p>Comment was deleted</p>
        </div>
      </div>
    );
  }

  return (
    <div className={isChild ? classes.child : ''} key={comment.id}>
      <div className={classes.content_item}>
        <Author className={classes.svg_icon} />
        <p className={classes.comment__author}>{comment.by}</p>
      </div>

      <div
        className={classes.comment_text}
        dangerouslySetInnerHTML={{ __html: comment.text }}
      />

      {comment.kids !== undefined && (
        <div className={classes.btn_wrapper}>
          <button onClick={fetchCommentKids}>
            {childVisibile ? 'show less' : 'show more'}
          </button>
          <p>{comment.kids.length} comments</p>
        </div>
      )}

      {childsLoading ? (
        <div style={{ position: 'relative', height: '100px' }}>
          <Loader size="small"></Loader>
        </div>
      ) : (
        <div></div>
      )}

      {childs &&
        !childsLoading &&
        childs.map((com: IPost) => (
          <MemoCommentsItem key={com.id} isChild={true} comment={com} />
        ))}
    </div>
  );
};

const MemoCommentsItem = memo(CommentsItem);

export default CommentsItem;
