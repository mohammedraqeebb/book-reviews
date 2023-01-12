import { Router } from 'express';
import { body } from 'express-validator';
import {
  createPublisher,
  readPublisher,
  searchPublisher,
} from '../controller/publisher';

import { requireAuth, validateRequest } from '../middlewares';

export const publisherRouter = Router();

publisherRouter.post(
  '/create',
  requireAuth,
  [
    body('name').exists().notEmpty().withMessage('name cannot be empty'),
    body('bio')
      .exists()
      .notEmpty()
      .isLength({ min: 100, max: 300 })
      .withMessage('bio should be atleast 100 and max 300 characters'),
    body('street').exists().notEmpty().withMessage('street cannot be empty'),
    body('state').exists().notEmpty().withMessage('state cannot be empty'),
    body('country').exists().notEmpty().withMessage('country cannot be empty'),
    body('countryCode')
      .exists()
      .notEmpty()
      .withMessage('country code cannot be empty'),
    body('phoneNumber')
      .exists()
      .notEmpty()
      .withMessage('phone number code cannot be empty'),
  ],
  validateRequest,
  createPublisher
);
publisherRouter.get('/:publisherid', readPublisher);
publisherRouter.post('/search', requireAuth, searchPublisher);
