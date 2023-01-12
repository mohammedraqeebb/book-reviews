import express, { Express } from 'express';
import 'express-async-errors';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieSession from 'cookie-session';

import { errorHandler, currentUser } from './middlewares';
import {
  authorRouter,
  publisherRouter,
  userRouter,
  bookRouter,
  commentRouter,
  ratingRouter,
  savedBooksRouter,
} from './routes';

export const app: Express = express();
const origin = ['*'];

app.use(cors({ origin }));
app.use(bodyParser.json());
app.use(cookieSession({ secure: false, signed: false }));

app.use(currentUser);

app.use('/api/auth', userRouter);
app.use('/api/author', authorRouter);
app.use('/api/publisher', publisherRouter);
app.use('/api/book', bookRouter);
app.use('/api/book/comment', commentRouter);
app.use('/api/book/rating', ratingRouter);
app.use('/api/book/saved', savedBooksRouter);

app.use(errorHandler);
