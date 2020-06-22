import {
  SET_INGREDIENTS,
  FETCH_INGREDIENTS_FAILED,
  CHANGE_INGREDIENT_QUANTITY
} from '../actions/actionTypes';
import { INGREDIENT_PRICES } from '../../constants/ingredient-prices';

const initialState = {
  ingredients: null,
  error: false,
  price: 0,
  purchaseable: false
};

const changeIngredientQuantity = (state, action) => {
  if (
    state.ingredients[action.payload.type] <= 0 &&
    action.payload.ingQuantityChange < 0
  ) {
    return;
  }

  const changedIngredients = { ...state.ingredients };
  changedIngredients[action.payload.type] += action.payload.ingQuantityChange;

  const price =
    state.price +
    action.payload.ingQuantityChange * INGREDIENT_PRICES[action.payload.type];

  const purchaseable = price > 0;

  return { ...state, ingredients: changedIngredients, price, purchaseable };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INGREDIENTS:
      return {
        ...state,
        price: 0,
        ingredients: action.ingredients,
        error: false
      };

    case FETCH_INGREDIENTS_FAILED:
      return { ...state, error: true };

    case CHANGE_INGREDIENT_QUANTITY:
      return changeIngredientQuantity(state, action);

    default:
      return state;
  }
};

export default reducer;
