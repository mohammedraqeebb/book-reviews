import { Router } from 'express';
import { createBook, deleteBook, updateBook } from '../controller/book';
import { requireAuth } from '../middlewares';

const bookRouter = Router();

bookRouter.post('/create', requireAuth, createBook);
bookRouter.put('/update', requireAuth, updateBook);
bookRouter.post('/:bookid', requireAuth, deleteBook);
bookRouter.get('/:bookid', createBook);
