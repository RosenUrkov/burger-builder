import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './Sidedrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary';

const Sidedrawer = props => {
  const attachedClasses = [
    classes.Sidedrawer,
    props.open ? classes.Open : classes.Closed
  ];

  return (
    <Auxiliary>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(' ')} onClick={props.closed}>
        <Logo height="11%" />
        <nav>
          <NavigationItems isAuth={props.isAuth} />
        </nav>
      </div>
    </Auxiliary>
  );
};

export default Sidedrawer;
