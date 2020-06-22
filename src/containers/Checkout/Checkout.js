import React, { useState, useEffect } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect, withRouter } from 'react-router';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

const Checkout = props => {
  if (props.purchased || !props.ingredients) {
    return <Redirect to="/burger-builder" />;
  }

  const checkoutCancelled = () => props.history.goBack();
  const checkoutContinued = () =>
    props.history.replace(`/checkout/contact-data`);

  return (
    <div>
      <CheckoutSummary
        ingredients={props.ingredients}
        checkoutContinued={checkoutContinued}
        checkoutCancelled={checkoutCancelled}
      />

      <Route
        path={props.match.path + '/contact-data'}
        component={ContactData}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    ingredients: state.ing.ingredients,
    purchased: state.ord.purchased
  };
};

export default connect(mapStateToProps)(Checkout);
