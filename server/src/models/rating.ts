import mongoose from 'mongoose';

type Gender = 'male' | 'female';
type RatingAttrs = {
  rating: number;
  userId: string;
};

export interface RatingDoc extends mongoose.Document {
  rating: number;
  userId: string;
}

interface RatingModel extends mongoose.Model<RatingDoc> {
  build(attrs: RatingAttrs): RatingDoc;
}
const ratingSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 0,
      max: 5,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

export const Rating = mongoose.model<RatingDoc, RatingModel>(
  'Rating',
  ratingSchema
);
