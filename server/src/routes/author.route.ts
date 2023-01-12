import { Router } from 'express';
import { createAuthor, readAuthor, searchAuthor } from '../controller/author';
import { requireAuth, validateRequest, isValidObjectId } from '../middlewares';
import { body, param } from 'express-validator';

export const authorRouter = Router();

authorRouter.post(
  '/create',
  requireAuth,
  [
    body('name').exists().notEmpty().trim().withMessage('name cannot be empty'),
    body('dateOfBirth')
      .exists()
      .trim()
      .isDate()
      .withMessage('enter proper date format'),
    body('gender')
      .exists()
      .trim()
      .custom((gender) => gender === 'male' || gender === 'female')
      .withMessage('enter valid gender'),
    body('bio')
      .exists()
      .notEmpty()
      .trim()
      .isLength({ min: 50, max: 300 })
      .withMessage('bio should be atleast 50 characters and less than 300'),
  ],
  validateRequest,
  createAuthor
);
authorRouter.get(
  '/:authorid',
  [
    param('authorid')
      .exists()
      .custom((id) => isValidObjectId(id))
      .withMessage('valid id is required'),
  ],
  validateRequest,
  readAuthor
);
authorRouter.post(
  '/search',
  requireAuth,
  [
    body('searchAuthorField')
      .exists()
      .trim()
      .isLength({ min: 1 })
      .withMessage('search author term is required'),
  ],
  validateRequest,
  searchAuthor
);
