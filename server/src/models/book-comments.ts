import mongoose from 'mongoose';
import { CommentDoc } from './comment';

interface BookCommentsAttrs {
  id: string;
  comment: CommentDoc;
}
interface BookCommentsDoc extends mongoose.Document {
  comments: CommentDoc[];
}
interface BookCommentsModel extends mongoose.Model<BookCommentsDoc> {
  build(attrs: BookCommentsAttrs): BookCommentsDoc;
}

const bookCommentsSchema = new mongoose.Schema(
  {
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
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

bookCommentsSchema.statics.build = (attrs: BookCommentsAttrs) => {
  return new BookComments({
    _id: attrs.id,
    ...attrs,
  });
};

export const BookComments = mongoose.model<BookCommentsDoc, BookCommentsModel>(
  'BookComments',
  bookCommentsSchema
);
