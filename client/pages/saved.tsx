import axios from 'axios';
import { NextPage, NextPageContext } from 'next';
import React from 'react';
import { Book } from './search';
import { BACKEND_URL } from './_app';

type SavedPageProps = {
  savedBooks: Book[];
};

const Saved: NextPage<SavedPageProps> = () => {
  return <div>Saved</div>;
};

export default Saved;

export const getServerSideProps = async (context: NextPageContext) => {
  const { data } = await axios.post(`${BACKEND_URL}/book/saved/all`);
  return {
    props: {
      savedBooks: data.savedBooks,
    },
  };
};
