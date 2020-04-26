import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
];

const BuildControls = props => {
  return (
    <div className={classes.BuildControls}>
      <div>Current Price: {props.price.toFixed(2)}</div>

      {controls.map(control => (
        <BuildControl
          key={control.label}
          disabled={props.disabled[control.type]}
          onIngChange={props.onChange}
          {...control}
        />
      ))}

      <button
        disabled={!props.purchaseable}
        onClick={props.ordered}
        className={classes.OrderButton}
      >
        ORDER NOW
      </button>
    </div>
  );
};

export default BuildControls;
