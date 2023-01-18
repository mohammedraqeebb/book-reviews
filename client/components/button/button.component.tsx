import { motion } from 'framer-motion';
import React, { ButtonHTMLAttributes, FC } from 'react';
import styles from './Button.module.scss';

type ButtonProps = {
  width: string;
  children: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ children, width, ...otherProps }) => {
  return (
    <button
      style={{ width }}
      className={styles.button_container}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
