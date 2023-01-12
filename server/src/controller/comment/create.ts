import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { body } from 'express-validator';
import { Comment } from '../../models/comment';
import { BookComments } from '../../models/book-comments';
import { BadRequestError, NotFoundError } from '../../errors';
import { Book } from '../../models/book';

export const createComment = async (req: Request, res: Response) => {
  console.log('params', req.params);
  const { bookid } = req.params;
  console.log(bookid);
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

  let bookComments = await BookComments.findById(bookid);
  if (!bookComments) {
    const newBookComments = BookComments.build({
      id: bookid,
      comments: [comment.id],
    });
    await newBookComments.save();
  } else if (bookComments) {
    bookComments.comments.push(comment.id);
    await bookComments.save();
  }

  res.status(201).send({ comment });
};
