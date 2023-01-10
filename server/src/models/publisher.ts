import mongoose from 'mongoose';

type PublisherAttrs = {
  name: string;
  userId: string;
  bio: string;
  street: string;
  state: string;
  country: string;
  countryCode: string;
  phoneNumber: string;
};

interface PublisherDoc extends mongoose.Document {
  name: string;
  userId: string;
  bio: string;
  street: string;
  state: string;
  country: string;
  countryCode: string;
  phoneNumber: string;
  booksId: string[];
}

interface PublisherModel extends mongoose.Model<PublisherDoc> {
  build(attrs: PublisherAttrs): PublisherDoc;
}
const publisherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'user',
  },
  bio: {
    type: String,
    required: true,
    max: 500,
  },
  street: {
    type: String,
    required: true,
    max: 100,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  countryCode: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  booksId: [
    {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Book',
      unique: true,
    },
  ],
});
publisherSchema.statics.build = (attrs: PublisherAttrs) => {
  return new Publisher(attrs);
};

export const Publisher = mongoose.model<PublisherDoc, PublisherModel>(
  'Publisher',
  publisherSchema
);
