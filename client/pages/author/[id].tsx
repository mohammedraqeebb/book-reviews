import axios from 'axios';
import { NextPage, NextPageContext } from 'next';
import React from 'react';
import { Book } from '../search';
import { BACKEND_URL } from '../_app';
import styles from '../../styles/AuthorDetails.module.scss';
import BookDetailsSearch from '../../components/book-details-search/book-details-search. component';
type AuthorDetailsProps = {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  bio: string;
  userId: string;
  books: Book[];
};

const AuthorDetails: NextPage<AuthorDetailsProps> = ({
  id,
  name,
  dateOfBirth,
  bio,
  userId,
  books,
}) => {
  return (
    <div>
      <div>
        <div className={styles.author_logo}>
          <p>
            {name
              .split(' ')
              .map((word) => word[0])
              .slice(0, 2)
              .join('')}
          </p>
        </div>
        <p>{bio}</p>
        <p>{dateOfBirth}</p>
        <div>
          <h5>Authored/Co-Authored books</h5>
          <div>
            {books.map((currentBook) => (
              <BookDetailsSearch key={currentBook.id} {...currentBook} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorDetails;

export const getServerSideProps = async (context: NextPageContext) => {
  const authorId = context.query.id;

  const { data } = await axios.get(`${BACKEND_URL}/author/${authorId}`);
  return {
    props: {
      ...data.author,
    },
  };
};
