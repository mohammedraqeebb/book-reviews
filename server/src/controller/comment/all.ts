import { Request, Response } from 'express';
import mongoose from 'mongoose';

import { BookComments } from '../../models/book-comments';
import { BadRequestError, NotFoundError } from '../../errors';
import { Book } from '../../models/book';
import { Comment } from '../../models/comment';
import { User } from '../../models/user';
import { UserPayload } from '../../middlewares';

export const getAllComments = async (
  commentIds: string[],
  user: null | UserPayload
) => {
  const bookComments = [];
  for (let i = 0; i < commentIds.length; i++) {
    const bookComment = await Comment.findById(
      commentIds[i].toString()
    ).populate('commentorId');
    if (!bookComment) {
      continue;
    }

    bookComments.push({
      id: bookComment.id,
      comment: bookComment.comment,
      updatedAt: bookComment.updatedAt,
      bookId: bookComment.bookId,
      commentor: {
        //@ts-ignore
        id: bookComment.commentorId.id,
        //@ts-ignore
        name: bookComment.commentorId.name,
      },
    });
  }
  if (!user) {
    return bookComments;
  }
  const userComments = bookComments.filter(
    (currentComment) => currentComment.commentor.id.toString() === user.id
  );
  const otherComments = bookComments.filter(
    (currentComment) => currentComment.commentor.id.toString() !== user.id
  );
  return [...userComments, ...otherComments];
};

export const allComments = async (req: Request, res: Response) => {
  const { bookid } = req.params;

  if (!mongoose.Types.ObjectId.isValid(bookid)) {
    throw new BadRequestError('valid bookid is required');
  }
  const existingBook = await Book.findById(bookid);
  if (!existingBook) {
    throw new NotFoundError('book not found');
  }

  const bookComments = await BookComments.findById(bookid);
  if (!bookComments) {
    return res.status(200).send({ comments: [] });
  }

  const bookCommentIds = bookComments.comments;

  const FormattedBookComments = await getAllComments(
    bookCommentIds as string[],
    req.currentUser ?? null
  );

  res.status(200).send({ comments: FormattedBookComments });
};
