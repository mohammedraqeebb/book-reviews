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
export interface BookDoc extends mongoose.Document {
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
        required: true,
      },
    ],
    publisherId: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Publisher',
    },
    genre: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
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
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        ret.authors = ret.authorIds;
        ret.publisher = ret.publisherId;
        delete ret.authorIds;
        delete ret.publisherId;
        delete ret._id;
        delete ret.__V;
      },
    },
  }
);

bookSchema.statics.build = (attrs: BookAttrs) => {
  return new Book(attrs);
};
export const Book = mongoose.model<BookDoc, BookModel>('Book', bookSchema);
