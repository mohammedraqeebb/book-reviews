import React, { FC, useState } from 'react';
import { CommentType } from '../../pages/book/[id]';
import { timeSince } from '../../util/validation/time-passed';
import styles from './Comment.module.scss';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { BACKEND_URL } from '../../pages/_app';
import useRequest from '../../hooks/use-request';
import { useAppSelector } from '../../app/hooks';

const Comment: FC<CommentType> = ({
  id,
  commentor,
  updatedAt,
  comment,
  bookId,
}) => {
  const user = useAppSelector((state) => state.user.user);
  const [showEditForm, setShowEditForm] = useState(false);
  const isCommentor = user && commentor.id.toString() === user.id;
  console.log('updated at', updatedAt);
  const { doRequest: editCommentRequest, errors: editCommentRequestErrors } =
    useRequest({
      url: `${BACKEND_URL}/book/comment/${bookId}/{id}`,
      method: 'put',
      body: { comment },
      onSuccess: () => {},
    });
  const {
    doRequest: deleteCommentRequest,
    errors: deleteCommentRequestErrors,
  } = useRequest({
    url: `${BACKEND_URL}/book/comment/${bookId}/{id}`,
    method: 'post',
    body: { comment },
    onSuccess: () => {},
  });
  return (
    <div className={styles.comment_container}>
      <div className={styles.comment_first_row}>
        <div className={styles.logo_and_name_time_container}>
          <div className={styles.comment_name_logo}>
            <p>
              {commentor.name
                .split(' ')
                .map((word) => word[0])
                .slice(0, 2)
                .join('')}
            </p>
          </div>
          <p className={styles.commentor_name}>{commentor.name}</p>
          <p className={styles.comment_time}>{timeSince(updatedAt)}</p>
        </div>
        {isCommentor && (
          <div className={styles.icons}>
            <FiEdit onClick={() => setShowEditForm(!showEditForm)} />
            <FiTrash onClick={() => deleteCommentRequest()} />
          </div>
        )}
      </div>
      <div className={styles.comment_second_row}>
        <p className={styles.comment_text}>{comment}</p>
      </div>
    </div>
  );
};

export default Comment;
