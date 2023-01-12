import { Router } from 'express';
import { body } from 'express-validator';
import {
  allComments,
  createComment,
  updateComment,
  deleteComment,
} from '../controller/comment';

import { requireAuth, validateRequest } from '../middlewares';

export const commentRouter = Router();

commentRouter.post(
  '/:bookid/create',
  requireAuth,
  [body('comment').exists().notEmpty().withMessage('comment required')],
  validateRequest,
  createComment
);
commentRouter.get('/:bookid/all', allComments);
commentRouter.put(
  '/:bookid/:commentid',
  requireAuth,
  [body('comment').exists().notEmpty().withMessage('comment required')],
  validateRequest,
  updateComment
);
commentRouter.post('/:bookid/:commentid', requireAuth, deleteComment);
