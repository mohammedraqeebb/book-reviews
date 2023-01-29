import axios from 'axios';
import { NextPage, NextPageContext } from 'next';
import React from 'react';
import BookDetailsSearch from '../../components/book-details-search/book-details-search. component';
import BookDetails from '../book/[id]';
import { Book } from '../search';
import { BACKEND_URL } from '../_app';

type PublisherDetailsProps = {
  id: string;
  name: string;
  userId: string;
  bio: string;
  street: string;
  state: string;
  establishedDate: string;
  countryCode: string;
  country: string;
  phoneNumber: string;
  books: Book[];
};

const PublisherDetails: NextPage<PublisherDetailsProps> = ({
  name,
  id,
  userId,
  bio,
  street,
  state,
  establishedDate,
  country,
  countryCode,
  phoneNumber,
  books,
}) => {
  return (
    <div>
      <div>
        <div>
          {name
            .split(' ')
            .map((word) => word[0])
            .slice(0, 2)
            .join('')}
        </div>
        <div>
          <div>{name}</div>
          <div>{establishedDate}</div>
          <div>
            <div>
              <span>{street}</span>
              <div>
                <span>{state}</span>
                <span>{country}</span>
              </div>
            </div>
            <div>
              <span>{countryCode}</span>
              <span>{phoneNumber}</span>
            </div>
          </div>
          <p>{bio}</p>
        </div>
        <div>
          {books.map((currentBook) => (
            <BookDetailsSearch key={currentBook.id} {...currentBook} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PublisherDetails;

export const getServerSideProps = async (context: NextPageContext) => {
  const publisherId = context.query.id;

  const { data } = await axios.get(`${BACKEND_URL}/publisher/${publisherId}`);
  return {
    props: {
      ...data.publisher,
    },
  };
};
