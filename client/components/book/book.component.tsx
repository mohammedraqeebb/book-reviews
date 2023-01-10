import React from 'react';
import styles from './Book.module.scss';

type BookProps = {
  title: string;
  authors: string[];
  likes: number;
  dislikes: number;
  rating: number;
  comments: number;
};

const Book = ({
  title,
  authors,
  likes,
  dislikes,
  rating,
  comments,
}: BookProps) => {
  return (
    <div className={styles.book_container}>
      <div className={styles.book_content_container}>
        <h4>{title}</h4>
        <div className={styles.authors_container}>
          {authors.map((author, idx) => (
            <h5 key={idx}>{author}</h5>
          ))}
        </div>
        <div className={styles.reactions_container}></div>
      </div>
    </div>
  );
};

export default Book;
