import React from 'react';
import styles from './Backdrop.module.scss';

const Backdrop = (props) => {
  return <div onClick={props.close} className={styles.backdrop}></div>;
};

export default Backdrop;
