import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = ({ ingredients }) => {
  const transformedIngredients = Object.keys(ingredients)
    .map(ingredient => {
      return Array.from({
        length: ingredients[ingredient]
      }).map((_, index) => (
        <BurgerIngredient key={ingredient + index} type={ingredient} />
      ));
    })
    .flat();

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />

      {transformedIngredients.length
        ? transformedIngredients
        : 'Please start adding ingredients!'}

      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
