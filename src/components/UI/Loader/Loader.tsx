import React from 'react';
import classes from './Loader.module.css';

interface ILoader {
  size?: 'small' | 'normal' | 'big';
}

const Loader: React.FC<ILoader> = ({ size }) => {
  let sizeValue;

  switch (size) {
    case 'small':
      sizeValue = '50px';

      break;

    case 'big':
      sizeValue = '200px';

      break;
    default:
      sizeValue = '124px';
      break;
  }
  return (
    <div className={classes.loader__wrapper}>
      <div
        style={{
          width: `${sizeValue}`,
          height: `${sizeValue}`,
        }}
        className={classes.loader}
      ></div>
    </div>
  );
};

export default Loader;
