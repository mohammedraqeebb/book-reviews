import React from 'react';
import styles from './Book.module.scss';
type Author = {
  id: string;
  name: string;
};

type BookProps = {
  title: string;
  authors: Author[];
  likes: number;
  dislikes: number;
  rating: number;
  comments: number;
};

const Book = ({
  title = 'the hard thruth',
  authors = [
    { id: '1', name: 'maria nowfall' },
    { id: '2', name: 'steve nowfall' },
  ],
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
            <h5 key={idx}>{author.name}</h5>
          ))}
        </div>
        <div className={styles.reactions_container}></div>
      </div>
    </div>
  );
};

export default Book;
