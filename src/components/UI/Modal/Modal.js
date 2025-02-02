import React, { useEffect } from 'react';
import classes from './Modal.module.css';
import Auxiliary from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

const Modal = props => {
  useEffect(() => console.log('Render Modal!'));

  return (
    <Auxiliary>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0'
        }}
        className={classes.Modal}
      >
        {props.children}
      </div>
    </Auxiliary>
  );
};

export default React.memo(
  Modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
);
