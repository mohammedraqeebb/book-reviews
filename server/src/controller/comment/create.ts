import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { body } from 'express-validator';
import { Comment } from '../../models/comment';
import { BookComments } from '../../models/book-comments';
import { BadRequestError, NotFoundError } from '../../errors';
import { Book } from '../../models/book';
import { getAllComments } from './all';

export const createComment = async (req: Request, res: Response) => {
  const { bookid } = req.params;

  const { comment: userComment } = req.body;

  if (!mongoose.Types.ObjectId.isValid(bookid)) {
    throw new BadRequestError('valid bookid is required');
  }
  const existingBook = await Book.findById(bookid);
  if (!existingBook) {
    throw new NotFoundError('book not found');
  }
  const comment = Comment.build({
    bookId: bookid,
    comment: userComment,
    commentorId: req.currentUser!.id,
  });
  await comment.save();

  const bookComments = await BookComments.findById(bookid);
  if (!bookComments) {
    const newBookComments = BookComments.build({
      id: bookid,
      comments: [comment.id],
    });
    await newBookComments.save();

    const bookCommentIds = newBookComments!.comments;

    const FormattedBookComments = await getAllComments(
      bookCommentIds as string[]
    );

    res.status(200).send({ bookComments: FormattedBookComments });
  }

  bookComments!.comments.push(comment.id);
  await bookComments!.save();

  const bookCommentIds = bookComments!.comments;

  const FormattedBookComments = await getAllComments(
    bookCommentIds as string[]
  );

  res.status(200).send({ bookComments: FormattedBookComments });
};
