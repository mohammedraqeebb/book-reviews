import { useEffect, useState } from 'react';
import useModal from '../hooks/use-modal';

import styles from '../styles/Test.module.scss';

const Test = () => {
  const Modal = useModal('hey ok');

  return (
    <div>
      <div className={styles.box_1}></div>
      <div className={styles.box_2}></div>
    </div>
  );
};

export default Test;
