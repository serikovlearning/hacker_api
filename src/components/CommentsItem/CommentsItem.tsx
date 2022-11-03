import React, { useState } from 'react';
import { getPostById } from '../../helpers/api';
import { IPost } from '../../interfaces/IPost';
import classes from './CommentsItem.module.css'
import { ReactComponent as Comment } from '../../img/comment.svg';
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
  const [childVisibile, setChildVisibile] = useState<boolean>(true);

  const fetchCommentKids = async (): Promise<void> => {
    if (comment.kids?.length > 0) {
      const response = await Promise.all(
        comment.kids?.map(async (kid) => {
          const res = await getPostById(kid);
          return res;
        })
      );
      setChilds([...response]);
    }
    setChildVisibile(false);
  };

  return (
    <div
      key={comment.id}
    >
      <div className={classes.content_item}>
              <Author className={classes.svg_icon} />
              <p>{comment.by}</p>
            </div>

      <div dangerouslySetInnerHTML={{ __html: comment.text }} />

      <div>
        {childVisibile && comment.kids !== undefined && (
          <button onClick={fetchCommentKids}>view more</button>
        )}
      </div>

      {childs &&
        childs.map((com: IPost) => (
          <CommentsItem key={com.id} isChild={true} comment={com} />
        ))}
    </div>
  );
};

export default CommentsItem;
