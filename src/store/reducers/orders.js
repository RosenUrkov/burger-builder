import {
  SET_ORDERS,
  FETCH_ORDERS_FAILED,
  PURCHASE_BURGER_SUCCESS,
  PURCHASE_BURGER_FAILURE,
  IS_LOADING,
  PURCHASE_INIT
} from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
  error: null
};

const setOrders = (state, action) => {
  const fetchedOrders = Object.keys(action.orders).reduce((orders, orderId) => {
    return [...orders, { ...action.orders[orderId], id: orderId }];
  }, []);

  return { ...state, error: null, orders: fetchedOrders, loading: false };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return setOrders(state, action);

    case FETCH_ORDERS_FAILED:
      return { ...state, error: action.error, loading: false };

    case PURCHASE_INIT:
      return { ...state, purchased: false, error: null };

    case PURCHASE_BURGER_SUCCESS:
      return {
        ...state,
        purchased: true,
        error: null,
        orders: [...state.orders, { ...action.order, id: action.id }]
      };

    case PURCHASE_BURGER_FAILURE:
      return { ...state, purchased: false, error: action.error };

    case IS_LOADING:
      return { ...state, loading: action.loading };

    default:
      return state;
  }
};

export default reducer;
