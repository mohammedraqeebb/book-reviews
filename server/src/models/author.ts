import mongoose from 'mongoose';

type Gender = 'male' | 'female';
type AuthorAttrs = {
  name: string;
  dateOfBirth: Date;
  gender: Gender;
  bio: string;
  userId: string;
};
//TODO: annotate booksid
interface AuthorDoc extends mongoose.Document {
  name: string;
  dateOfBirth: Date;
  gender: Gender;
  bio: string;
  userId: string;
  booksId: string[];
}

interface AuthorModel extends mongoose.Model<AuthorDoc> {
  build(attrs: AuthorAttrs): AuthorDoc;
}
const authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
    },
    bio: {
      type: String,
      max: 500,
    },
    userId: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'user',
    },
    booksId: [
      {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Book',
        unique: true,
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
authorSchema.statics.build = (attrs: AuthorAttrs) => {
  return new Author(attrs);
};
export const Author = mongoose.model<AuthorDoc, AuthorModel>(
  'Author',
  authorSchema
);
