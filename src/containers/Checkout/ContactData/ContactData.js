import React, { useState } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import { purchaseBurgerStart, isLoading } from '../../../store/actions/orders';
import withErrorHandler from '../../../hoc/withErrorHandler';
import { Redirect } from 'react-router';
import { checkFormValidity } from '../../../shared/utility';

const ContactData = props => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your name'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    street: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Street'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    zipCode: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'ZIP Code'
      },
      value: '',
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5
      },
      valid: false,
      touched: false
    },
    country: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Country'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Your E-mail'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    deliveryMethod: {
      elementType: 'select',
      elementConfig: {
        options: [
          {
            value: 'fastest',
            displayValue: 'Fastest'
          },
          {
            value: 'cheapest',
            displayValue: 'Cheapest'
          }
        ]
      },
      validation: {},
      value: 'fastest',
      valid: true
    }
  });

  if (props.loading) {
    return <Spinner />;
  }

  const orderHandler = event => {
    event.preventDefault();

    const customer = Object.keys(orderForm).reduce((customer, formKey) => {
      return {
        ...customer,
        [formKey]: orderForm[formKey].value
      };
    }, {});

    const order = {
      customer,
      ingredients: props.ingredients,
      price: props.price,
      userId: props.userId
    };

    props.onPurchaseBurgerStart(order, props.token);
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    const changedOrderForm = { ...orderForm };
    changedOrderForm[inputIdentifier] = {
      ...changedOrderForm[inputIdentifier]
    };

    changedOrderForm[inputIdentifier].value = event.target.value;
    changedOrderForm[inputIdentifier].touched = true;
    changedOrderForm[inputIdentifier].valid = checkFormValidity(
      event.target.value,
      changedOrderForm[inputIdentifier].validation
    );

    setOrderForm(changedOrderForm);

    const isValid = Object.keys(changedOrderForm).every(
      key => changedOrderForm[key].valid
    );
    setFormIsValid(isValid);
  };

  const formElementsArray = Object.keys(orderForm).map(key => ({
    id: key,
    config: orderForm[key]
  }));

  return (
    <div className={classes.ContactData}>
      <h4>Enter your Contact Data</h4>

      <form onSubmit={orderHandler}>
        {formElementsArray.map(element => {
          return (
            <Input
              key={element.id}
              {...element.config}
              changed={ev => inputChangedHandler(ev, element.id)}
            />
          );
        })}

        <Button disabled={!formIsValid} buttonType="Success">
          ORDER
        </Button>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    ingredients: state.ing.ingredients,
    price: state.ing.price,
    orders: state.ord.orders,
    loading: state.ord.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPurchaseBurgerStart: (order, token) =>
      dispatch(purchaseBurgerStart(order, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
