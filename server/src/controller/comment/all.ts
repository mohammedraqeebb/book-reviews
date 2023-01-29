import { Request, Response } from 'express';
import mongoose from 'mongoose';

import { BookComments } from '../../models/book-comments';
import { BadRequestError, NotFoundError } from '../../errors';
import { Book } from '../../models/book';
import { Comment } from '../../models/comment';
import { User } from '../../models/user';

export const allComments = async (req: Request, res: Response) => {
  const { bookid } = req.params;

  if (!mongoose.Types.ObjectId.isValid(bookid)) {
    throw new BadRequestError('valid bookid is required');
  }
  const existingBook = await Book.findById(bookid);
  if (!existingBook) {
    throw new NotFoundError('book not found');
  }

  const bookCommentIds = await BookComments.findById(bookid).populate(
    'comments'
  );
  if (!bookCommentIds) {
    return res.status(200).send({ bookComments: [] });
  }
  const comments = bookCommentIds.comments;
  const bookComments = [];
  for (let i = 0; i < comments.length; i++) {
    const bookComment = await Comment.findById(comments[i].id).populate(
      'commentorId'
    );
    if (!bookComment) {
      continue;
    }

    console.log('updatedAt', bookComment.update);
    bookComments.push({
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

  res.status(200).send({ bookComments });
};
