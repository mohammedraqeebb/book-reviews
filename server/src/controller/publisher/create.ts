import { Request, Response } from 'express';
import { Publisher } from '../../models/publisher';

export const createAuthor = async (req: Request, res: Response) => {
  const { name, bio, street, state, country, countryCode, phoneNumber } =
    req.body;
  const publisher = Publisher.build({
    name,
    bio,
    street,
    state,
    country,
    countryCode,
    phoneNumber,
    userId: req.currentUser!.id,
  });
  await publisher.save();
  return res.status(201).send({ publisher });
};
