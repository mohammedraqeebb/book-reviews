import mongoose from 'mongoose';

type Genre =
  | 'biography'
  | 'personality development'
  | 'comics'
  | 'horror'
  | 'fiction'
  | 'novel';
type BookAttrs = {
  name: string;
  dateOfRelease: string;
  about: string;
  authorIds: string[];
  publisherId: string;
  genre: Genre;
  userId: string;
};
interface BookDoc extends mongoose.Document {
  name: string;
  dateOfRelease: string;
  about: string;
  userId: string;
  authorIds: string[];
  publisherId: string;
  views: number;
  likes: number;
  dislikes: number;
  ratings: string;
  genre: Genre;
}

interface BookModel extends mongoose.Model<BookDoc> {
  build(attrs: BookAttrs): BookDoc;
}

//TODO: add reference to fieds with type mongoose object id and min and max validation

const bookSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    dateOfRelease: {
      required: true,
      type: Date,
    },
    about: {
      required: true,
      type: String,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    authorIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        unique: true,
      },
    ],
    publisherId: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
    },
    genre: {
      type: String,
      required: true,
    },
    views: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    ratings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BookRatings',
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BookComments',
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

bookSchema.statics.build = (attrs: BookAttrs) => {
  return new Book(attrs);
};
export const Book = mongoose.model<BookDoc, BookModel>('Book', bookSchema);
