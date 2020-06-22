import React from 'react';
import classes from './Order.module.css';

const Order = props => {
  const transformedIngredients = Object.keys(props.ingredients)
    .map((ingredient, index) => {
      return { name: ingredient, amount: props.ingredients[ingredient] };
    })
    .map(({ name, amount }) => {
      return (
        <span
          style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid #ccc',
            padding: '5px'
          }}
          key={name}
        >
          {name} ({amount})
        </span>
      );
    });

  return (
    <div className={classes.Order}>
      <p>Ingredients: {transformedIngredients}</p>
      <p>
        Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
