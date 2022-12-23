import { IPost } from '../../interfaces/IPost';
import { Link } from 'react-router-dom';
import classes from './PostItem.module.scss';
import { ReactComponent as Author } from '../../img/author.svg';
import { ReactComponent as Calendar } from '../../img/calendar.svg';
import { ReactComponent as Star } from '../../img/star.svg';
import { ReactComponent as Comment } from '../../img/comment.svg';

interface PostItemProps {
  postData: IPost;
  postType: 'main' | 'other';
}

export const PostItem: React.FC<PostItemProps> = (props) => {
  const { postData, postType } = props;

  const convertTime = (time: number) => {
    let date = new Date(time * 1000).toUTCString();
    return date;
  };

  if (postType === 'other')
    return (
      <Link style={{}} to={`/news/${postData.id}`}>
        <div className={classes.wrapper}>
          <h2>{postData.title}</h2>

          <div className={classes.content}>
            <div className={classes.content_item}>
              <Star className={classes.svg_icon} />
              <p>{postData.score}</p>
            </div>
            <div className={classes.content_item}>
              <Author className={classes.svg_icon} />
              <p>{postData.by}</p>
            </div>
            <div className={`${classes.content_item} ${classes.date}`}>
              <Calendar className={classes.svg_icon} />
              <p>{convertTime(Number(postData.time)).slice(0, 17).trim()}</p>
            </div>
          </div>
        </div>
      </Link>
    );
  return (
    <div className={`${classes.wrapper} ${classes.single_wrapper}`}>
      <h2 className={classes.single_title}>{postData.title}</h2>
      <div className={classes.content}>
        <div className={classes.content_item}>
          <Author className={classes.svg_icon} />
          <p>{postData.by}</p>
        </div>
        <div className={classes.content_item}>
          <Comment className={classes.svg_icon} />
          <p>{postData.kids ? postData.descendants: 0} comments</p>
        </div>
        <div className={`${classes.content_item} ${classes.date}`}>
          <Calendar className={classes.svg_icon} />
          <p>{convertTime(Number(postData.time)).slice(0, 17).trim()}</p>
        </div>
      </div>
      <div className={`${classes.content_item} ${classes.btn_block}`}>
        <a href={postData.url} target="_blank">
          <button className={classes.btn_small}>link</button>
        </a>
        <Link to="/">
          <button className={classes.btn_small}>back</button>
        </Link>
      </div>
    </div>
  );
};
