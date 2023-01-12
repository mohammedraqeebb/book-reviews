import mongoose from 'mongoose';

interface SavedBooksAttrs {
  userId: string;
}

interface SavedBooksDoc extends mongoose.Document {
  bookIds: string[];
}

interface SavedBooksModel extends mongoose.Model<SavedBooksDoc> {
  build(attrs: SavedBooksAttrs): SavedBooksDoc;
}

const savedBooksSchema = new mongoose.Schema(
  {
    bookIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        ret.books = ret.bookIds;
        delete ret.bookIds;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

savedBooksSchema.statics.build = (attrs: SavedBooksAttrs) => {
  return new SavedBooks({
    _id: attrs.userId,
    ...attrs,
  });
};

export const SavedBooks = mongoose.model<SavedBooksDoc, SavedBooksModel>(
  'SavedBooks',
  savedBooksSchema
);
