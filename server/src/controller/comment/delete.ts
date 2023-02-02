import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Comment } from '../../models/comment';
import {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
} from '../../errors';
import { Book } from '../../models/book';
import { BookComments } from '../../models/book-comments';
import { getAllComments } from './all';

export const deleteComment = async (req: Request, res: Response) => {
  const { bookid, commentid } = req.params;

  const existingBook = await Book.findById(bookid);
  if (!existingBook) {
    throw new NotFoundError('product not found');
  }
  const existingComment = await Comment.findById(commentid);

  if (!existingComment) {
    throw new NotFoundError('comment not found');
  }

  if (req.currentUser!.id !== existingComment.commentorId.toString()) {
    throw new UnauthorizedError('you are not authorized to edit');
  }

  await Comment.findByIdAndDelete(existingComment.id);

  res.status(200).send({});
};
