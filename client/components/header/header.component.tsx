import React from 'react';
import Logo from '../../static/assets/icons/logo.icon';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <div className={styles.header_container}>
      <Logo />
    </div>
  );
};

export default Header;
