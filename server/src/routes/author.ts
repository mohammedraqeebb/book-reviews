import { Router } from 'express';
import { createAuthor, readAuthor } from '../controller/author/';
import { requireAuth, validateRequest } from '../middlewares';
import { body } from 'express-validator';

const authorRouter = Router();
//TODO: validate date
authorRouter.post(
  '/create',
  requireAuth,
  [
    body('name').trim().exists().notEmpty().withMessage('name cannot be empty'),
    body('date')
      .trim()
      .custom((date) => true)
      .withMessage('enter proper date format'),
    body('gender')
      .trim()
      .custom((gender) => gender === 'male' || gender === 'female')
      .withMessage('enter valid gender'),
    body('bio')
      .exists()
      .notEmpty()
      .custom((bio) => bio.length >= 50),
  ],
  validateRequest,
  createAuthor
);
authorRouter.get('/authorid', readAuthor);
