import React, { useState } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const BurgerBuilder = props => {
  const [ingredients, setIngredients] = useState({
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  });

  const [price, setPrice] = useState(0);
  const [purchaseable, setPurchaseable] = useState(price > 0);
  const [purchasing, setPurchasing] = useState(false);

  const handlePurchase = () => setPurchasing(true);
  const handlePurchaseCancel = () => setPurchasing(false);
  const handlePurchaseContinue = () => alert('Geve me your money!');

  const disabledInfo = Object.keys(ingredients).reduce((disabled, ingType) => {
    if (ingredients[ingType] <= 0) {
      disabled[ingType] = true;
    } else {
      disabled[ingType] = false;
    }

    return disabled;
  }, {});

  const handleIngredientsChange = (type, ingQuantityChange) => {
    if (ingredients[type] <= 0 && ingQuantityChange < 0) {
      return;
    }

    const changedIngredients = { ...ingredients };
    changedIngredients[type] += ingQuantityChange;
    setIngredients(changedIngredients);

    const newPrice = price + ingQuantityChange * INGREDIENT_PRICES[type];
    setPrice(newPrice);

    setPurchaseable(newPrice > 0);
  };

  return (
    <Auxiliary>
      <Modal show={purchasing} modalClosed={handlePurchaseCancel}>
        <OrderSummary
          ingredients={ingredients}
          price={price}
          purchaseCancelled={handlePurchaseCancel}
          purchaseContinued={handlePurchaseContinue}
        />
      </Modal>

      <Burger ingredients={ingredients} />
      <BuildControls
        price={price}
        purchaseable={purchaseable}
        disabled={disabledInfo}
        ordered={handlePurchase}
        onChange={handleIngredientsChange}
      />
    </Auxiliary>
  );
};

export default BurgerBuilder;
