import React, { FC } from 'react';
import { Book } from '../../pages/search';
import { convertToWordedDate } from '../../util/convert-to-worded-date';
import styles from './BookDetailsSearch.module.scss';

const BookDetailsSearch: FC<Book> = ({
  name,
  dateOfRelease,
  genre,
  authors,
  publisher,
}) => {
  console.log('search', genre.split(' ').join('_'));
  return (
    <div className={styles.book_details_container}>
      <div
        className={`${styles.book_cover} book_${genre.split(' ').join('_')}`}
      >
        <h6 className={styles.book_name}>{name}</h6>
        <h6 className={styles.book_author}>{authors[0].name}</h6>
      </div>
      <div className={styles.book_details}>
        <h6 className={styles.book_name_right}>{name}</h6>
        <p className={styles.book_publisher}>{publisher.name}</p>
        <p className={styles.book_date}>
          {convertToWordedDate(dateOfRelease.slice(0, 13))}
        </p>
        <p className={styles.book_genre}>{genre}</p>
      </div>
    </div>
  );
};

export default BookDetailsSearch;
