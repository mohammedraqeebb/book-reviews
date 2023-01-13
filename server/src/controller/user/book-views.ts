import { Request, Response } from 'express';

import { User } from '../../models/user';

export const bookViews = async (req: Request, res: Response) => {
  const existingUser = await User.findById(req.currentUser!.id).populate(
    'bookViewsIds'
  );

  return res.status(200).send({ bookViews: existingUser!.bookViewsIds });
};
