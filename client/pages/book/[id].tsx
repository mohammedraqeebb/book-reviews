import axios from 'axios';
import { NextPage, NextPageContext } from 'next';
import React, { useState } from 'react';
import { Book } from '../search';
import { BACKEND_URL } from '../_app';
import styles from '../../styles/BookDetails.module.scss';
import Link from 'next/link';
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
  AiFillEye,
} from 'react-icons/ai';
import { GrLinkUp } from 'react-icons/gr';
import { style } from '@mui/system';
import { convertToWordedDate } from '../../util/convert-to-worded-date';
//@ts-ignore
type Comment = {
  bookId: string;
  comment: string;
  commentorId: string;
  updatedAt: string;
};
type BookDetailsProps = {
  book: Book;
  comments: Comment[];
};
const BookDetails: NextPage<BookDetailsProps> = ({ book }) => {
  const {
    name,
    genre,
    authors,
    publisher,
    dateOfRelease,
    likes,
    dislikes,
    views,
    about,
  } = book;
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const clickLiked = () => {
    setDisliked(false);
    setLiked(true);
  };

  const clickDisliked = () => {
    setDisliked(true);
    setLiked(false);
  };
  return (
    <div className={styles.book_container}>
      <div className={styles.book_details_container}>
        <div
          className={`${styles.book_cover} book_${genre.split(' ').join('_')}`}
        >
          <h4 className={styles.book_name}>{name}</h4>
          <h5 className={styles.book_author}>{authors[0].name}</h5>
        </div>
        <div className={styles.book_info}>
          <h4 className={styles.book_name}>{name}</h4>
          <div className={styles.book_authors_container}>
            {authors.map((currentAuthor) => (
              <Link
                className={styles.author_container}
                key={currentAuthor.id}
                href=""
              >
                <p>{currentAuthor.name}</p>
                <span>
                  {' '}
                  <GrLinkUp size={12} className={styles.link_icon} />
                </span>
              </Link>
            ))}
          </div>
          <Link className={styles.publisher_container} href="/">
            <p> {publisher.name}</p>
            <span>
              {' '}
              <GrLinkUp
                size={10}
                style={{ transform: 'rotate(45deg)', margin: 'auto 0px' }}
              />
            </span>
          </Link>
          <p className={styles.genre}>{genre}</p>
          <p className={styles.date_of_release}>
            {convertToWordedDate(dateOfRelease)}
          </p>

          <div className={styles.user_reactions_container}>
            <span className={styles.view_container}>
              <AiFillEye size={20} />
              <p>{views}</p>
            </span>
            <span className={styles.like_container}>
              {liked ? <AiFillLike size={20} /> : <AiOutlineLike size={20} />}
              <p>{likes.length}</p>
            </span>
            <span className={styles.dislike_container}>
              {disliked ? (
                <AiFillDislike size={20} />
              ) : (
                <AiOutlineDislike size={20} />
              )}
              <p>{dislikes.length}</p>
            </span>
            <span className={styles.like_container}></span>
          </div>
          <p className={styles.about_container}>{about}</p>
        </div>
      </div>
      <div className={styles.comments_sections}>
        <div className={styles.comment_input_container}>
          <textarea />
        </div>
      </div>
      <div>comments</div>
    </div>
  );
};

export default BookDetails;

export const getServerSideProps = async (context: NextPageContext) => {
  const bookid = context.query.id;
  const [{ data: bookData }, { data: commentsData }, { data: ratingsData }] =
    await Promise.all([
      await axios.get(`${BACKEND_URL}/book/${bookid}`),
      await axios.get(`${BACKEND_URL}/book/comment/${bookid}/all`),
      await axios.get(`${BACKEND_URL}/book/rating/${bookid}/all`),
    ]);

  return {
    props: {
      book: bookData.book,
      comments: commentsData.bookComments,
      ratings: ratingsData.bookRatings,
    },
  };
};
