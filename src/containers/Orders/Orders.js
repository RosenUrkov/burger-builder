import React, { useEffect, useState } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import { setOrders, initOrders } from '../../store/actions/orders';

const Orders = props => {
  const { token, userId, onInitOrders } = props;

  useEffect(() => {
    onInitOrders(token, userId);
  }, [onInitOrders, token, userId]);

  if (props.error) {
    return <h1>{props.error}</h1>;
  }

  if (props.loading) {
    return <Spinner />;
  }

  return (
    <div>
      {props.orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      ))}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    orders: state.ord.orders,
    loading: state.ord.loading,
    error: state.ord.error,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitOrders: (token, userId) => dispatch(initOrders(token, userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
