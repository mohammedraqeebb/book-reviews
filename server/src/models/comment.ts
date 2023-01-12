import mongoose from 'mongoose';

interface CommentAttrs {
  bookId: string;
  comment: string;
  commentorId: string;
}

export interface CommentDoc extends mongoose.Document {
  bookId: string;
  comment: string;
  commentorId: string;
}

interface CommentModel extends mongoose.Model<CommentDoc> {
  build(attrs: CommentAttrs): CommentDoc;
}

const commentSchema = new mongoose.Schema(
  {
    bookId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Book',
    },
    comment: {
      type: String,
      required: true,
      max: 200,
      trim: true,
    },
    commentorId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

commentSchema.statics.build = (attrs: CommentAttrs) => {
  return new Comment(attrs);
};

export const Comment = mongoose.model<CommentDoc, CommentModel>(
  'Comment',
  commentSchema
);
