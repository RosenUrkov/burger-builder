import React from 'react';
import classes from './Input.module.css';

const Input = props => {
  let element = null;
  const inputClasses = [classes.InputElement];

  if (!props.valid && props.validation && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  if (props.elementType === 'input') {
    element = (
      <input
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}
      />
    );
  }

  if (props.elementType === 'select') {
    element = (
      <select
        className={inputClasses.join(' ')}
        value={props.value}
        onChange={props.changed}
      >
        {props.elementConfig.options.map(option => (
          <option key={option.value} value={option.value}>
            {option.displayValue}
          </option>
        ))}
      </select>
    );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {element}
    </div>
  );
};

export default Input;
