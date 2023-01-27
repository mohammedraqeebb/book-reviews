import React, { FC, useRef, TouchEvent, useState, MouseEvent } from 'react';
import { Book } from '../../pages/search';
import BookCover from '../book-cover/book-cover.component';
import styles from './BooksList.module.scss';

type BooksListProps = {
  books: Book[];
  listTitle: string;
};

const BooksList: FC<BooksListProps> = ({ books, listTitle }) => {
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    setStartX(e.clientX);
    setStartScrollLeft(containerRef.current.scrollLeft);
    setIsMouseDown(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current || !isMouseDown) return;
    // Get the horizontal distance of the swipe
    const distance = e.clientX - startX;
    // Scroll the content by the distance of the swipe
    containerRef.current.scrollTo({
      left: startScrollLeft - distance,
      behavior: 'auto',
    });
  };

  const handleMouseUp = () => {
    setStartX(0);
    setStartScrollLeft(0);
    setIsMouseDown(false);
  };

  return (
    <div className={styles.books_list_component}>
      <h3>{listTitle}</h3>
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        //   onTouchMove={handleSwipe}
        className={styles.books_list_container}
      >
        {books && books.map((book) => <BookCover key={book.id} {...book} />)}
      </div>
    </div>
  );
};

export default BooksList;

//   const containerRef = useRef<HTMLDivElement>(null);
//   const [startX, setStartX] = useState(0);
//   const [startScrollLeft, setStartScrollLeft] = useState(0);
//   const [isTouching, setIsTouching] = useState(false);

//   const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
//     if (!containerRef.current) return;
//     setStartX(e.touches[0].clientX);
//     setStartScrollLeft(containerRef.current.scrollLeft);
//     setIsTouching(true);
//   };

//   const handleTouchMove = (e: TouchEvent) => {
//     if (!containerRef.current || !isTouching) return;
//     // Get the horizontal distance of the swipe
//     const distance = e.touches[0].clientX - startX;
//     // Scroll the content by the distance of the swipe
//     containerRef.current.scrollTo({
//         left: startScrollLeft - distance,
//         behavior: 'auto'
//     });
//   };

//   const handleTouchEnd = () => {
//     setStartX(0);
//     setStartScrollLeft(0);
//     setIsTouching(false);
//   }

//   return (
//     <div
//       ref={containerRef}
//       style={{
//         overflowX: 'scroll',
//         width: '100%',
//         height: '200px',
//         scrollbarWidth: 'none'
//       }}
//       onTouchStart={handleTouchStart}
//       onTouchMove={handleTouchMove}
//       onTouchEnd={handleTouchEnd}
