import { Router } from 'express';
import { bookLikes, bookViews } from '../controller/user';
import { requireAuth } from '../middlewares';

export const userRouter = Router();

userRouter.post('/view', requireAuth, bookViews);
userRouter.post('/like', requireAuth, bookLikes);
