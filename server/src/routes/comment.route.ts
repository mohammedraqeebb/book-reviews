import { Router } from 'express';
import { body, param } from 'express-validator';
import {
  allComments,
  createComment,
  updateComment,
  deleteComment,
} from '../controller/comment';

import { isValidObjectId, requireAuth, validateRequest } from '../middlewares';

export const commentRouter = Router();

commentRouter.post(
  '/:bookid/create',
  requireAuth,
  [
    param('bookid')
      .exists()
      .custom((id) => isValidObjectId(id))
      .withMessage('valid author id is required'),
    body('comment').exists().notEmpty().withMessage('comment required'),
  ],
  validateRequest,
  createComment
);
commentRouter.get(
  '/:bookid/all',
  [
    param('bookid')
      .exists()
      .custom((id) => isValidObjectId(id))
      .withMessage('valid author id is required'),
  ],
  validateRequest,
  allComments
);
commentRouter.put(
  '/:bookid/:commentid',
  requireAuth,
  [
    param('bookid')
      .exists()
      .custom((id) => isValidObjectId(id))
      .withMessage('valid author id is required'),
    param('commentid')
      .exists()
      .custom((id) => isValidObjectId(id))
      .withMessage('valid author id is required'),
    body('comment').exists().notEmpty().withMessage('comment required'),
  ],
  validateRequest,
  updateComment
);
commentRouter.post(
  '/:bookid/:commentid',
  [
    param('bookid')
      .exists()
      .custom((id) => isValidObjectId(id))
      .withMessage('valid author id is required'),
    param('commentid')
      .exists()
      .custom((id) => isValidObjectId(id))
      .withMessage('valid author id is required'),
  ],
  validateRequest,
  requireAuth,
  deleteComment
);
