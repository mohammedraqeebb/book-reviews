import { Request, Response } from 'express';
import { BadRequestError, NotFoundError } from '../../errors';
import { Book } from '../../models/book';

import { SavedBooks } from '../../models/saved-books';

export const deleteBook = async (req: Request, res: Response) => {
  const { bookid } = req.params;

  const existingBook = await Book.findById(bookid);
  if (!existingBook) {
    throw new NotFoundError('book not found');
  }
  const savedBooksList = await SavedBooks.findById(req.currentUser!.id);
  if (!savedBooksList) {
    return res.status(200).send({ savedBooks: [] });
  }

  const updatedBookIds = savedBooksList!.bookIds.filter(
    (currentBookId) => currentBookId.toString() !== bookid
  );

  savedBooksList!.bookIds = updatedBookIds;

  await savedBooksList!.save();
  return res
    .status(200)
    .send({ savedBooks: await savedBooksList!.populate('bookIds') });
};
