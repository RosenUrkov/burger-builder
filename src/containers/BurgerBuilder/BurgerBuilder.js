import React, { useState, useEffect, useCallback } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
  changeIngredientQuantity,
  initIngredients
} from '../../store/actions/ingredients';
import { purchaseInit } from '../../store/actions/orders';
import Spinner from '../../components/UI/Spinner/Spinner';

const BurgerBuilder = props => {
  const [purchasing, setPurchasing] = useState(false);

  const {
    ingredients,
    price,
    purchaseable,
    error,
    isAuthenticated
  } = useSelector(state => {
    return {
      ingredients: state.ing.ingredients,
      price: state.ing.price,
      purchaseable: state.ing.purchaseable,
      error: state.ing.error,
      isAuthenticated: !!state.auth.token
    };
  });

  const dispatch = useDispatch();
  const onInitIngredients = useCallback(() => dispatch(initIngredients()), [
    dispatch
  ]);
  const onChangeIngredientQuantity = (type, ingQuantityChange) =>
    dispatch(changeIngredientQuantity(type, ingQuantityChange));
  const onInitPurchase = () => dispatch(purchaseInit());

  useEffect(() => {
    if (ingredients) {
      return;
    }

    onInitIngredients();
  }, [onInitIngredients, ingredients]);

  if (error) {
    return <p>Ingredients can't be loaded!</p>;
  }

  if (!ingredients) {
    return <Spinner />;
  }

  const handlePurchase = () => {
    if (!isAuthenticated) {
      props.history.push('/auth');
      return;
    }

    setPurchasing(true);
  };
  const handlePurchaseCancel = () => setPurchasing(false);
  const handlePurchaseContinue = () => {
    onInitPurchase();
    props.history.push({ pathname: `checkout` });
  };

  const disabledInfo = Object.keys(ingredients).reduce((disabled, ingType) => {
    if (ingredients[ingType] <= 0) {
      disabled[ingType] = true;
    } else {
      disabled[ingType] = false;
    }

    return disabled;
  }, {});

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
        isAuth={isAuthenticated}
        onChange={onChangeIngredientQuantity}
      />
    </Auxiliary>
  );
};

export default withErrorHandler(BurgerBuilder, axios);
