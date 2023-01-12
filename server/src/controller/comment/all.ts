import { Request, Response } from 'express';
import mongoose from 'mongoose';

import { BookComments } from '../../models/book-comments';
import { BadRequestError, NotFoundError } from '../../errors';
import { Book } from '../../models/book';

export const allComments = async (req: Request, res: Response) => {
  const { bookid } = req.params;

  if (!mongoose.Types.ObjectId.isValid(bookid)) {
    throw new BadRequestError('valid bookid is required');
  }
  const existingBook = await Book.findById(bookid);
  if (!existingBook) {
    throw new NotFoundError('book not found');
  }

  const bookComments = await BookComments.findById(bookid).populate('comments');
  if (!bookComments) {
    return res.status(200).send({ comments: [] });
  }

  res.status(201).send({ bookComments: bookComments });
};
