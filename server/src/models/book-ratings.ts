import mongoose from 'mongoose';
import { RatingDoc } from './rating';

interface BookRatingsAttrs {
  id: string;
  rating: RatingDoc;
}
interface BookRatingsDoc extends mongoose.Document {
  ratings: RatingDoc[];
}
interface BookRatingsModel extends mongoose.Model<BookRatingsDoc> {
  build(attrs: BookRatingsAttrs): BookRatingsDoc;
}

const bookRatingsSchema = new mongoose.Schema(
  {
    ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rating' }],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

bookRatingsSchema.statics.build = (attrs: BookRatingsAttrs) => {
  return new BookRatings({
    _id: attrs.id,
    ...attrs,
  });
};

export const BookRatings = mongoose.model<BookRatingsDoc, BookRatingsModel>(
  'BookRatings',
  bookRatingsSchema
);
