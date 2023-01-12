import { Router } from 'express';
import {
  createBook,
  deleteBook,
  readBook,
  updateBook,
} from '../controller/book';
import { requireAuth } from '../middlewares';

export const bookRouter = Router();

bookRouter.post('/create', requireAuth, createBook);
bookRouter.put('/:bookid', requireAuth, updateBook);
bookRouter.post('/:bookid', requireAuth, deleteBook);
bookRouter.get('/:bookid', readBook);
