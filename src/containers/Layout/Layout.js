import React, { Fragment, useState } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Sidedrawer from '../../components/Navigation/Sidedrawer/Sidedrawer';
import { connect } from 'react-redux';

const Layout = props => {
  const [showSidedrawer, setShowSidedrawer] = useState(false);

  const sideDrawerToggleHandler = () => setShowSidedrawer(!showSidedrawer);
  const sideDrawerClosedHandler = () => setShowSidedrawer(false);

  return (
    <Auxiliary>
      <Toolbar
        clicked={sideDrawerToggleHandler}
        isAuth={props.isAuthenticated}
      />
      <Sidedrawer
        open={showSidedrawer}
        closed={sideDrawerClosedHandler}
        isAuth={props.isAuthenticated}
      />
      <main className={classes.Content}>{props.children}</main>
    </Auxiliary>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.auth.token
  };
};

export default connect(mapStateToProps)(Layout);
