import express from 'express';
import { body } from 'express-validator';
import {
  forgotPassword,
  googleSignin,
  signin,
  signout,
  signup,
  userName,
  currentUserInfo,
} from '../controller/auth';
import { currentUser } from '../middlewares/current-user';
import { validateRequest } from '../middlewares/validate-request';
import { PasswordManager } from '../utils/password-manager';

export const userRouter = express.Router();

const PASSWORD_VALIDATION_ERROR_MESSAGE =
  'password must be atleast eight characters containing atleast one special character,digit, lowercase and uppercase alphabet';

userRouter.post(
  '/signup',
  [
    body('name').trim().notEmpty().withMessage('enter name'),
    body('email').trim().isEmail().withMessage('enter valid email'),
    body('password')
      .trim()
      .custom((password) => PasswordManager.validatePassword(password))
      .withMessage(PASSWORD_VALIDATION_ERROR_MESSAGE),
  ],
  validateRequest,
  signup
);

userRouter.post(
  '/signin',
  [
    body('email').trim().isEmail().withMessage('enter valid email'),
    body('password')
      .trim()
      .custom((password) => PasswordManager.validatePassword(password))
      .withMessage(PASSWORD_VALIDATION_ERROR_MESSAGE),
  ],
  validateRequest,
  signin
);

userRouter.post('/signout', signout);
userRouter.post(
  '/name',
  body('userId').exists().withMessage('user id is required to be edited'),
  validateRequest,
  userName
);

userRouter.post(
  '/forgotpassword',
  [body('email').trim().isEmail().withMessage('enter valid email')],
  validateRequest,
  forgotPassword
);

userRouter.post(
  '/changepassword',
  [body('email').trim().isEmail().withMessage('enter valid email')],
  validateRequest,
  forgotPassword
);

userRouter.post('/googlesignin', googleSignin);

userRouter.post('/currentuser', currentUser, currentUserInfo);
