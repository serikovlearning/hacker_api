import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks';
import classes from './BackgroundText.module.scss';

const BackgroundText: React.FC = () => {
  const { postsId, loading, post } = useAppSelector((state) => state.posts);
  const location = useLocation();

  if (loading) {
    return (
      <div className={classes.bg_text_wrapper}>
        <p className={`${classes.bg_text} ${classes.text__loader}`}>Loading...</p>
      </div>
    );
  }
  if (location.pathname !== '/') {
    return (
      <div>
        <ul className={classes.bg_text_wrapper}>
          {postsId.map((item) => (
            <li key={item} className={classes.bg_text}>
              {post.by} <br />
              {post.by} <br />
              {post.by} <br />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <ul className={classes.bg_text_wrapper}>
        <li className={classes.bg_text}>
          {'<> serikov <>'} <br />
          {'<> serikov <>'} <br />
          {'<> serikov <>'} <br />
          {'<> serikov <>'} <br />
          {'<> serikov <>'} <br />
        </li>
      </ul>
    </div>
  );
};

export default BackgroundText;
