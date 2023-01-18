import React, { FC, InputHTMLAttributes } from 'react';
import styles from './SearchBox.module.scss';
import { AiOutlineSearch } from 'react-icons/ai';

type SearchBoxProps = {
  width?: string;
  height?: string;
  iconSize?: number;
} & InputHTMLAttributes<HTMLInputElement>;

const SearchBox: FC<SearchBoxProps> = ({
  width,
  height,
  iconSize,
  ...props
}) => {
  return (
    <div style={{ width, height }} className={styles.search_box_container}>
      <AiOutlineSearch
        size={iconSize ?? 20}
        style={{
          position: 'absolute',
          top: '50%',
          left: 6,
          transform: 'translateY(-50%)',
        }}
      />
      <input className={styles.search_box} {...props} />
    </div>
  );
};

export default SearchBox;
