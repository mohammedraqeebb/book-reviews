import axios from 'axios';
import { NextPage, NextPageContext } from 'next';
import React, {
  useState,
  MouseEvent,
  useEffect,
  FormEvent,
  useCallback,
} from 'react';
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
  AiFillRightCircle,
  AiFillStar,
} from 'react-icons/ai';
import { GrLinkUp } from 'react-icons/gr';
import { style } from '@mui/system';
import { convertToWordedDate } from '../../util/convert-to-worded-date';
import CommentType from '../../components/comment/comment.component';
import Comment from '../../components/comment/comment.component';
import useRequest from '../../hooks/use-request';
import { useAppSelector } from '../../app/hooks';
import { UserState } from '../../features/user/user-slice';
import { roundOffNumber } from '../../util/round-off-number';
//@ts-ignore
type User = {
  id: string;
  name: string;
};
export type CommentType = {
  id: string;
  bookId: string;
  comment: string;
  commentor: User;
  updatedAt: string;
};
type BookDetailsProps = {
  book: Book;
  comments: CommentType[];
};
const BookDetails: NextPage<BookDetailsProps> = ({ book, comments }) => {
  const {
    id,
    name,
    genre,
    authors,
    publisher,
    dateOfRelease,
    likes,
    dislikes,
    views,
    about,
    createdAt,
  } = book;

  const handleCommentSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await addCommentRequest();
  };
  const user = useAppSelector((state) => state.user.user);
  const [userState, setUserState] = useState<UserState | null>(null);
  const [executeFetchComments, setExecuteFetchComments] = useState(false);

  const [likeState, setLikeState] = useState({
    liked: false,
    numberOfLikes: 0,
    disliked: false,
    numberOfDislikes: 0,
  });

  const [readMore, setReadMore] = useState(false);
  const [comment, setcomment] = useState('');

  const [commentsData, setCommentsData] = useState(comments);

  const { doRequest: addLikeRequest, errors: addLikeErrors } = useRequest({
    url: `${BACKEND_URL}/book/${id}/like/add`,
    method: 'post',
    authenticated: true,
    onSuccess: () => {},
  });
  const { doRequest: removeLikeRequest, errors: removeLikeErrors } = useRequest(
    {
      url: `${BACKEND_URL}/book/${id}/like/remove`,
      method: 'post',
      authenticated: true,
      onSuccess: () => {},
    }
  );
  const { doRequest: addDislikeRequest, errors: addLikeRequestErrors } =
    useRequest({
      url: `${BACKEND_URL}/book/${id}/dislike/add`,
      method: 'post',
      authenticated: true,
      onSuccess: () => {},
    });
  const {
    doRequest: removeDislikeRequest,
    errors: removeDislikeRequestErrors,
  } = useRequest({
    url: `${BACKEND_URL}/book/${id}/dislike/remove`,
    method: 'post',
    authenticated: true,
    onSuccess: () => {},
  });
  const clickLikeEvent = async (event: MouseEvent) => {
    event.stopPropagation();
    if (likeState.disliked) {
      setLikeState({
        liked: true,
        disliked: false,
        numberOfLikes: likeState.numberOfLikes + 1,
        numberOfDislikes: likeState.numberOfDislikes - 1,
      });
    } else {
      setLikeState({
        liked: true,
        disliked: false,
        numberOfLikes: likeState.numberOfLikes + 1,
        numberOfDislikes: likeState.numberOfDislikes,
      });
    }
    await addLikeRequest();
  };
  const removeLikeEvent = async (event: MouseEvent) => {
    event.stopPropagation();
    setLikeState({
      liked: false,
      disliked: false,
      numberOfLikes: likeState.numberOfLikes - 1,
      numberOfDislikes: likeState.numberOfDislikes,
    });

    await removeLikeRequest();
  };
  const clickDislikeEvent = async (event: MouseEvent) => {
    event.stopPropagation();
    if (likeState.liked) {
      setLikeState({
        liked: false,
        disliked: true,
        numberOfLikes: likeState.numberOfLikes - 1,
        numberOfDislikes: likeState.numberOfDislikes + 1,
      });
    } else {
      setLikeState({
        liked: false,
        disliked: true,
        numberOfLikes: likeState.numberOfLikes,
        numberOfDislikes: likeState.numberOfDislikes + 1,
      });
    }

    await addDislikeRequest();
  };
  const removeDislikeEvent = async (event: MouseEvent) => {
    event.stopPropagation();
    setLikeState({
      liked: false,
      disliked: false,
      numberOfLikes: likeState.numberOfLikes,
      numberOfDislikes: likeState.numberOfDislikes - 1,
    });

    await removeDislikeRequest();
  };

  const { doRequest: addCommentRequest, errors: addCommentRequestErrors } =
    useRequest({
      url: `${BACKEND_URL}/book/comment/${id}/create`,
      method: 'post',
      body: { comment },
      authenticated: true,
      onSuccess: (data) => {
        setExecuteFetchComments((value) => !value);
        setcomment('');
      },
    });
  const { doRequest: addViewRequest, errors: addViewRequestErrors } =
    useRequest({
      url: `${BACKEND_URL}/book/${id}/view`,
      method: 'post',
      onSuccess: () => {},
    });

  const {
    doRequest: fetchCommentsRequest,
    errors: fetchCommentsRequestErrors,
  } = useRequest({
    url: `${BACKEND_URL}/book/comment/${id}/all`,
    method: 'get',
    onSuccess: (data) => {
      setCommentsData(data.bookComments);
    },
  });
  console.log('executefetchcomments', executeFetchComments);

  useEffect(() => {
    console.log('fetch comments executed');
    fetchCommentsRequest();
  }, [executeFetchComments]);
  const updateUser = useCallback(() => {
    console.log('use call back hit');
    setUserState(user);
  }, [user]);
  useEffect(() => {
    setUserState(user);
  }, []);

  useEffect(() => {
    updateUser();
    if (!user) {
      console.log('user null hit');
      return;
    }
    console.log('user null pass');
    const hasuserLiked = !user ? false : likes.includes(user.id) ? true : false;

    const hasUserDisliked = !user
      ? false
      : dislikes.includes(user.id)
      ? true
      : false;

    setLikeState({
      liked: hasuserLiked,
      numberOfLikes: likes.length,
      disliked: hasUserDisliked,
      numberOfDislikes: dislikes.length,
    });
    console.log(likeState);
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      addViewRequest();
    }, 1500);
    return () => clearTimeout(timer);
  }, [JSON.stringify(user)]);

  return (
    <div className={styles.book_view_page}>
      <div className={styles.book_details_section}>
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
                href="/author/[id]"
                as={`/author/${currentAuthor.id}`}
              >
                <p>{currentAuthor.name}</p>
                <span>
                  {' '}
                  <GrLinkUp size={12} className={styles.link_icon} />
                </span>
              </Link>
            ))}
          </div>
          <Link
            className={styles.publisher_container}
            href="/publisher/[id]"
            as={`/publisher/${publisher.id}`}
          >
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
              <p>{roundOffNumber(views)}</p>
            </span>
            <span className={styles.like_container}>
              {likeState.liked ? (
                <AiFillLike onClick={removeLikeEvent} size={20} />
              ) : (
                <AiOutlineLike onClick={clickLikeEvent} size={20} />
              )}
              <p>{roundOffNumber(likeState.numberOfLikes)}</p>
            </span>
            <span className={styles.dislike_container}>
              {likeState.disliked ? (
                <AiFillDislike size={20} onClick={removeDislikeEvent} />
              ) : (
                <AiOutlineDislike size={20} onClick={clickDislikeEvent} />
              )}
              <p>{roundOffNumber(likeState.numberOfDislikes)}</p>
            </span>
            <span className={styles.rating_container}>
              <AiFillStar size={20} />
              <p>10</p>
            </span>
          </div>
          <p className={styles.about_container}>{about}</p>
        </div>
      </div>
      <div className={styles.comments_section}>
        <form
          onSubmit={handleCommentSubmit}
          className={styles.comment_input_container}
        >
          <textarea
            draggable="false"
            placeholder="add a comment ..."
            value={comment}
            onChange={(e) => setcomment(e.target.value)}
          />
          <button onClick={handleCommentSubmit} disabled={comment.length === 0}>
            <AiFillRightCircle
              color={comment.length === 0 ? '#b4b8bc' : '#08090a'}
              size={24}
            />
          </button>
        </form>
        <div className={styles.comments_container}>
          {commentsData.map((currentComment) => (
            <Comment
              {...currentComment}
              // setCommentsData={setCommentsData}
              setExecuteFetchComments={setExecuteFetchComments}
              key={currentComment.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;

export const getServerSideProps = async (context: NextPageContext) => {
  console.log('server side');
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
