import { Request, Response } from 'express';
import { NotFoundError, UnauthorizedError } from '../../errors';
import { Book } from '../../models/book';

export const deleteBook = async (req: Request, res: Response) => {
  const { bookid } = req.params;
  const existingBook = await Book.findById(bookid);
  if (!existingBook) {
    throw new NotFoundError('book not found');
  }
  if (existingBook.userId.toString() !== req.currentUser!.id) {
    throw new UnauthorizedError('you are not authorized to do this');
  }
  await Book.findByIdAndDelete(bookid);
  return res.status(200).send({});
};
