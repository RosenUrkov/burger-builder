import React, { useState } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import { connect } from 'react-redux';
import { auth } from '../../store/actions/auth';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router';
import { checkFormValidity } from '../../shared/utility';

const Auth = props => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formIsValid, setFormIsValid] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Your E-mail'
      },
      value: '',
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Password'
      },
      value: '',
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false
    }
  });

  if (props.isAuthenticated) {
    return <Redirect to={props.purchasable ? '/checkout/contact-data' : '/'} />;
  }
  if (props.error) {
    return <h1>{props.error.message}</h1>;
  }
  if (props.loading) {
    return <Spinner />;
  }

  const inputChangedHandler = (event, inputIdentifier) => {
    const changedLoginForm = { ...loginForm };
    changedLoginForm[inputIdentifier] = {
      ...changedLoginForm[inputIdentifier]
    };

    changedLoginForm[inputIdentifier].value = event.target.value;
    changedLoginForm[inputIdentifier].touched = true;
    changedLoginForm[inputIdentifier].valid = checkFormValidity(
      event.target.value,
      changedLoginForm[inputIdentifier].validation
    );

    setLoginForm(changedLoginForm);

    const isValid = Object.keys(changedLoginForm).every(
      key => changedLoginForm[key].valid
    );
    setFormIsValid(isValid);
  };

  const handleAuth = event => {
    event.preventDefault();

    const email = loginForm.email.value;
    const password = loginForm.password.value;

    props.onAuth(email, password, isSignUp);
  };

  const switchAuthModeHandler = () => setIsSignUp(!isSignUp);

  const formElementsArray = Object.keys(loginForm).map(key => ({
    id: key,
    config: loginForm[key]
  }));

  return (
    <div className={classes.Auth}>
      <div style={{ fontWeight: 'bold' }}>
        {isSignUp ? 'SIGN UP' : 'SIGN IN'}
      </div>

      <form onSubmit={handleAuth}>
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
          SUBMIT
        </Button>
      </form>

      <Button buttonType="Danger" clicked={switchAuthModeHandler}>
        SWITCH TO {isSignUp ? 'SIGN IN' : 'SIGN UP'}
      </Button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: !!state.auth.token,
    purchasable: state.ing.purchaseable
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(auth(email, password, isSignUp))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
