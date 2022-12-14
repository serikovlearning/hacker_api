import React from 'react';
import classes from './CustomSelect.module.scss';

interface Options {
  value: string;
}
interface IProps {
  options: Array<Options>;
  onChange: (sort: string) => void;
  value: string;
}

const CustomSelect: React.FC<IProps> = (props: IProps) => {
  const { options, onChange, value } = props;

  return (
    <select 
      className={classes.select} 
      value={value}
      onChange={event => onChange(event.target.value)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          Sort by {option.value}
        </option>
      ))}
    </select>
  );
};

export default CustomSelect;
