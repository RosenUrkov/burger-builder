import {
  SET_ORDERS,
  FETCH_ORDERS_FAILED,
  PURCHASE_BURGER_SUCCESS,
  PURCHASE_BURGER_FAILURE,
  IS_LOADING,
  PURCHASE_INIT
} from './actionTypes';
import axios from '../../axios-orders';

export const setOrders = orders => {
  return { type: SET_ORDERS, orders };
};

export const fetchOrdersFailed = error => {
  return { type: FETCH_ORDERS_FAILED, error };
};

export const initOrders = (token, userId) => {
  return dispatch => {
    dispatch(isLoading(true));

    const queryParams = `auth=${token}&orderBy="userId"&equalTo="${userId}"`;

    axios
      .get(`/orders.json?${queryParams}`)
      .then(({ data }) => dispatch(setOrders(data)))
      .catch(error => dispatch(fetchOrdersFailed(error.response.data.error)));
  };
};

export const purchaseBurgerSuccess = (id, order) => {
  return {
    type: PURCHASE_BURGER_SUCCESS,
    id,
    order
  };
};

export const purchaseBurgerFailure = error => {
  return {
    type: PURCHASE_BURGER_FAILURE,
    error
  };
};

export const purchaseBurgerStart = (order, token) => {
  return dispatch => {
    dispatch(isLoading(true));

    axios
      .post(`/orders.json?auth=${token}`, order)
      .then(response =>
        dispatch(purchaseBurgerSuccess(response.data.name, order))
      )
      .catch(error => purchaseBurgerFailure(error))
      .then(dispatch(isLoading(false)));
  };
};

export const isLoading = loading => {
  return {
    type: IS_LOADING,
    loading
  };
};

export const purchaseInit = () => {
  return {
    type: PURCHASE_INIT
  };
};
