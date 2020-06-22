import React, { useEffect } from 'react';
import { logout } from '../../../store/actions/auth';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

const Logout = props => {
  useEffect(() => {
    props.onLogout();
  });

  return <Redirect to="/burger-builder" />;
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(logout())
  };
};

export default connect(null, mapDispatchToProps)(Logout);
