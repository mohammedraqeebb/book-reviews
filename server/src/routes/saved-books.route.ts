import { deleteBook, allSavedBooks, addBook } from '../controller/saved-books';
import { Router } from 'express';
import { requireAuth } from '../middlewares';

export const savedBooksRouter = Router();

savedBooksRouter.post('/:bookid/create', requireAuth, addBook);
savedBooksRouter.post('/all', requireAuth, allSavedBooks);
savedBooksRouter.post('/:bookid/delete', deleteBook);
