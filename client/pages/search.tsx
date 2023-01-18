import React, { useState, ChangeEvent } from 'react';
import styles from '../styles/Search.module.scss';
import SearchBox from '../components/search-box.component';
import useRequest from '../hooks/use-request';
import { BACKEND_URL } from './_app';
export const Genre = [
  'biography',
  'personality development',
  'comics',
  'horror',
  'fiction',
  'novel',
] as const;
type Author = {
  id: string;
  name: string;
};

export type Book = {
  id: string;
  name: string;
  dateOfRelease: string;
  about: string;
  userId: string;
  authors: Author[];
  publisherId: string;
  views: number;
  likes: string[];
  dislikes: string[];
  genre: typeof Genre[number];
};

const Search = () => {
  const [bookSearchField, setBookSearchField] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const { doRequest, errors } = useRequest({
    url: `${BACKEND_URL}/book/search/all`,
    body: { bookSearchField },
    method: 'post',
    onSuccess: (data) => {
      setBooks(data.books);
    },
  });
  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setBookSearchField(event.target.value);
    await doRequest<Book[]>();
  };

  return (
    <div className={styles.search_wrapper}>
      <div className={styles.search_container}>
        <div className={styles.search_box_container}>
          <SearchBox
            type="search"
            autoComplete="off"
            placeholder="search for books"
            onChange={handleChange}
          />
        </div>
        {books.map((book) => (
          <h1 key={book.id}>{book.name}</h1>
        ))}
      </div>
    </div>
  );
};

export default Search;
