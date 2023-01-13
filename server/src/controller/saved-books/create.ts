import { Request, Response } from 'express';
import { BadRequestError, NotFoundError } from '../../errors';
import { Book } from '../../models/book';

import { SavedBooks } from '../../models/saved-books';

export const addBook = async (req: Request, res: Response) => {
  const { bookid } = req.params;

  const existingBook = await Book.findById(bookid);
  if (!existingBook) {
    throw new NotFoundError('book not found');
  }
  const savedBooksList = await SavedBooks.findById(req.currentUser!.id);

  if (!savedBooksList) {
    const newSavedBooksList = SavedBooks.build({
      userId: req.currentUser!.id,
    });
    newSavedBooksList.bookIds.push(bookid);
    await newSavedBooksList.save();

    return res
      .status(201)
      .send({ savedBooks: await newSavedBooksList.populate('bookIds') });
  }

  for (const currentBookId of savedBooksList.bookIds) {
    if (currentBookId.toString() === bookid) {
      throw new BadRequestError('book already added in wishlist');
    }
  }

  savedBooksList.bookIds.push(bookid);
  await savedBooksList.save();
  return res
    .status(201)
    .send({ savedBooks: await savedBooksList.populate('bookIds') });
};
