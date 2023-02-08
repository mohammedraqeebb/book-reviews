import express, { Express, NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieSession from 'cookie-session';

import { errorHandler, currentUser } from './middlewares';
import {
  authorRouter,
  publisherRouter,
  authRouter,
  bookRouter,
  commentRouter,
  ratingRouter,
  savedBooksRouter,
  userRouter,
} from './routes';

export const app: Express = express();
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header(
    'Access-Control-Allow-Methods',
    'GET,PUT,POST,DELETE,UPDATE,OPTIONS'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
  );
  next();
});

TODO:;

const allowedOrigins = ['https://book-reviews-j9mi.vercel.app'];
app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
const delayMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await sleep(5000);
  next();
};

app.use(bodyParser.json());
// app.use(cookieSession({ secure: false, signed: false }));
// app.use(delayMiddleware);

app.use(cookieSession({ secure: true, signed: false }));

app.use(currentUser);
// app.use((req, res, next) => {
//   setTimeout(next, 5000);
// });

app.use('/api/auth', authRouter);
app.use('/api/author', authorRouter);
app.use('/api/publisher', publisherRouter);
app.use('/api/book', bookRouter);
app.use('/api/book/comment', commentRouter);
app.use('/api/book/rating', ratingRouter);
app.use('/api/book/saved', savedBooksRouter);
app.use('/api/user', userRouter);

app.use(errorHandler);
