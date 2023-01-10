import express, { Request, Response } from 'express';
import { NotFoundError } from '../../errors';
import { User } from '../../models/user';

export const userName = async (req: Request, res: Response) => {
  const user = await User.findById(req.body.userId);
  console.log(user);
  if (!user) {
    throw new NotFoundError('user not found');
  }

  return res.status(200).send({ name: user.name, email: user.email });
};
