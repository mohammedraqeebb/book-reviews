import { Request, Response } from 'express';
import { NotFoundError, UnauthorizedError } from '../../errors';
import { Author } from '../../models/author';
import { Book } from '../../models/book';
import { Publisher } from '../../models/publisher';
import {
  addBookToAuthors,
  validateAuthorIds,
  validatePublisherId,
} from './create';

const findNewAuthorIdsAndValidateThem = async (
  authorIds: string[],
  existingAuthorIds: string[]
) => {
  //the below codes time complexity can be further optimized using Set. however since authors list won't be more than 10 authors tops, so array.includes should work perfectly fine. set.has could be more performant though
  const commonAuthorIds = authorIds.filter((authorId) =>
    existingAuthorIds.includes(authorId.toString())
  );
  const newAuthorIds = authorIds.filter(
    (authorId) => !commonAuthorIds.includes(authorId.toString())
  );
  const removedAuthorIds = existingAuthorIds.filter(
    (authorId) => !commonAuthorIds.includes(authorId.toString())
  );

  const validatedAuthorIds = await validateAuthorIds(newAuthorIds);
  return {
    newAuthorIds: validatedAuthorIds,
    commonAuthorIds,
    removedAuthorIds,
  };
};

const removeAuthorsFromBook = async (authorIds: string[], bookId: string) => {
  for (let i = 0; i < authorIds.length; i++) {
    const existingAuthor = await Author.findById(authorIds[i]);
    if (existingAuthor) {
      const updatedBooksId = existingAuthor.booksId.filter(
        (bookId) => bookId.toString() !== bookId
      );
      existingAuthor.booksId = updatedBooksId;
      await existingAuthor.save();
    }
  }
};

const addBookToPublisher = async (publisherId: string, bookId: string) => {
  const existingPublisher = await Publisher.findById(publisherId);
  if (existingPublisher) {
    existingPublisher.booksId.push(bookId);
    await existingPublisher.save();
  }
};

const removeBookFromPublisher = async (publisherId: string, bookId: string) => {
  const existingPublisher = await Publisher.findById(publisherId);
  if (existingPublisher) {
    const updatedBookIds = existingPublisher.booksId.filter(
      (currentBookId) => currentBookId.toString() !== bookId
    );
    existingPublisher.booksId = updatedBookIds;
    await existingPublisher.save();
  }
};

export const updateBook = async (req: Request, res: Response) => {
  const { name, dateOfRelease, authorIds, publisherId, genre, about } =
    req.body;
  const { bookid } = req.params;
  const existingBook = await Book.findById(bookid);
  if (!existingBook) {
    throw new NotFoundError('book not found');
  }
  if (existingBook.userId.toString() !== req.currentUser!.id) {
    throw new UnauthorizedError('you are not authorized to delete a book');
  }
  const { newAuthorIds, commonAuthorIds, removedAuthorIds } =
    await findNewAuthorIdsAndValidateThem(authorIds, existingBook.authorIds);

  await addBookToAuthors(newAuthorIds, existingBook.id);
  await removeAuthorsFromBook(removedAuthorIds, existingBook.id);
  const validatedPublisherId = await validatePublisherId(publisherId);
  if (validatedPublisherId !== existingBook.publisherId.toString()) {
    await addBookToPublisher(validatedPublisherId, existingBook.id);
    await removeBookFromPublisher(
      existingBook.publisherId.toString(),
      existingBook.id
    );
  }

  existingBook.set({
    name,
    dateOfRelease,
    authorIds: [...newAuthorIds, ...commonAuthorIds],
    publisherId: validatedPublisherId,
    genre,
    about,
  });
  await existingBook.save();

  return res.status(200).send({ book: existingBook });
};
