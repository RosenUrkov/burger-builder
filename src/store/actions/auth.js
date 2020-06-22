import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT
} from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: AUTH_SUCCESS,
    token,
    userId
  };
};

export const authFail = error => {
  return {
    type: AUTH_FAIL,
    error
  };
};

export const logout = () => {
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('token');
  localStorage.removeItem('userId');

  return {
    type: AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => dispatch(logout()), +expirationTime * 1000);
  };
};

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());

    const apiKey = 'AIzaSyAgFY5dXK6e0W2hMQ5f8W6fGPQ0weSXAkE';
    const authData = { email, password, returnSecureToken: true };

    const url = isSignUp
      ? `http://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`
      : `http://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

    axios
      .post(url, authData)
      .then(res => {
        const expirationDate = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        );

        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', res.data.localId);
        localStorage.setItem('token', res.data.idToken);

        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch(error => {
        dispatch(authFail(error.response.data.error));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    const expirationDate = new Date(localStorage.getItem('expirationDate'));

    if (!token || !userId || expirationDate < new Date()) {
      dispatch(logout());
      return;
    }

    dispatch(authSuccess(token, userId));
    dispatch(
      checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000)
    );
  };
};
