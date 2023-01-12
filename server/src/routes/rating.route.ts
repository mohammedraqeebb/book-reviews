import { Router } from 'express';
import { body } from 'express-validator';
import { createRating, updateRating, allRatings } from '../controller/rating';
import { requireAuth, validateRequest } from '../middlewares';

export const ratingRouter = Router();

ratingRouter.post(
  '/:bookid/create',
  requireAuth,
  [
    body('rating')
      .exists()
      .notEmpty()
      .isFloat({ min: 1, max: 10 })
      .withMessage('rating has to be between 1 to 10'),
  ],
  validateRequest,
  createRating
);
ratingRouter.put(
  '/:bookid/:ratingid',
  [
    body('rating')
      .exists()
      .notEmpty()
      .isFloat({ min: 1, max: 10 })
      .withMessage('rating has to be between 1 to 10'),
  ],
  validateRequest,
  requireAuth,
  updateRating
);
ratingRouter.get('/:bookid', allRatings);
