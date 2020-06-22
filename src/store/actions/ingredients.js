import {
  CHANGE_INGREDIENT_QUANTITY,
  SET_INGREDIENTS,
  FETCH_INGREDIENTS_FAILED
} from './actionTypes';
import axios from '../../axios-orders';

export const setIngredients = ingredients => {
  return { type: SET_INGREDIENTS, ingredients };
};

export const fetchIngredientsFailed = () => {
  return { type: FETCH_INGREDIENTS_FAILED };
};

export const initIngredients = () => {
  return dispatch => {
    axios
      .get('/ingredients.json')
      .then(request => dispatch(setIngredients(request.data)))
      .catch(error => {
        dispatch(fetchIngredientsFailed());
      });
  };
};

export const changeIngredientQuantity = (type, ingQuantityChange) => {
  return {
    type: CHANGE_INGREDIENT_QUANTITY,
    payload: { type, ingQuantityChange }
  };
};
