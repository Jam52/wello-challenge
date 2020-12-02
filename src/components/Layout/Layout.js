import React from 'react';
import styles from './Layout.module.scss';

const Layout = (props) => {
  return <div className={styles.layout}>{props.children}</div>;
};

export default Layout;
