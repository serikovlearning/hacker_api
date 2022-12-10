import React from 'react';
import classes from './CustomSelect.module.css';

interface Options {
  value: string;
  text: string;
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
          {option.text}
        </option>
      ))}
    </select>
  );
};

export default CustomSelect;
