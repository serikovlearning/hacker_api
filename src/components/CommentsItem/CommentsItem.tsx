import React, { useState, memo } from 'react';
import { getPostById } from '../../helpers/api';
import { IPost } from '../../interfaces/IPost';
import classes from './CommentsItem.module.css';
import { ReactComponent as Cross } from '../../img/cross.svg';
import { ReactComponent as Author } from '../../img/author.svg';

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

  const fetchCommentKids = async (): Promise<void> => {
    if (comment.kids?.length > 0 && !childVisibile) {
      const response = await Promise.all(
        comment.kids?.map(async (kid) => {
          const res = await getPostById(kid);
          return res;
        })
      );
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

      <div className={classes.btn_wrapper}>
        {comment.kids !== undefined && (
          <button onClick={fetchCommentKids}>
            {childVisibile ? 'show less' : 'show more'}
          </button>
        )}
      </div>

      {childs &&
        childs.map((com: IPost) => (
          <MemoCommentsItem key={com.id} isChild={true} comment={com} />
        ))}
    </div>
  );
};

const MemoCommentsItem = memo(CommentsItem);

export default CommentsItem;
