import { Request, Response } from 'express';

export const currentUserInfo = (req: Request, res: Response) => {
  const currentUser = req.currentUser || null;
  res.send({ user: currentUser });
};
