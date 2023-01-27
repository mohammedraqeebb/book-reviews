import { Request, Response } from 'express';
import { BadRequestError, NotFoundError } from '../../errors';

import { SavedBooks } from '../../models/saved-books';

export const allSavedBooks = async (req: Request, res: Response) => {
  const savedBooksList = await SavedBooks.findById(
    req.currentUser!.id
  ).populate('bookIds');

  if (!savedBooksList) {
    return res
      .status(200)
      .send({ name: req.currentUser!.name, savedBooks: [] });
  }
  return res
    .status(200)
    .send({ name: req.currentUser!.name, savedBooks: savedBooksList });
};
