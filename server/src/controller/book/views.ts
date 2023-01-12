import { Request, Response } from 'express';
import { NotFoundError } from '../../errors';
import { Book, BookDoc } from '../../models/book';
import { User } from '../../models/user';

const increaseViewCount = async (book: BookDoc) => {
  book.set({ likes: book.likes + 1 });
  await book.save();
  return;
};

const registerBookViewForTheUser = async (userId: string, bookId: string) => {
  const existingUser = await User.findById(userId);
  if (existingUser) {
    const bookViewIds = existingUser.bookViewsIds;
    const bookIdFound = bookViewIds.find(
      (currentBookViewId) => currentBookViewId.toString() === bookId
    );
    if (!bookIdFound) {
      existingUser.bookViewsIds.unshift(bookId);
      await existingUser.save();
    }
  }
  return;
};

export const registerView = async (req: Request, res: Response) => {
  const { bookid } = req.params;
  const existingBook = await Book.findById(bookid);
  if (!existingBook) {
    throw new NotFoundError('not found error');
  }
  if (req.currentUser) {
    await Promise.all([
      increaseViewCount(existingBook),
      registerBookViewForTheUser(req.currentUser!.id, bookid),
    ]);
    return res.status(201).send({});
  }
  await increaseViewCount(existingBook);
  return res.status(201).send({});
};
