import express, { Express } from 'express';
import 'express-async-errors';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieSession from 'cookie-session';
import { userRouter } from './routes/user';
import { errorHandler } from './middlewares/error-handler';
import { currentUser } from './middlewares/current-user';

export const app: Express = express();
const origin = ['*'];

app.use(cors({ origin }));
app.use(bodyParser.json());
app.use(cookieSession({ secure: false, signed: false }));

app.use(currentUser);
app.use('/api/auth', userRouter);

app.use(errorHandler);
