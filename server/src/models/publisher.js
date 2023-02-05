"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Publisher = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const publisherSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'user',
    },
    establishedDate: {
        type: Date,
        required: true,
    },
    bio: {
        type: String,
        required: true,
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
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Book',
        },
    ],
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            ret.books = ret.booksId;
            delete ret._id;
            delete ret.__v;
            delete ret.booksId;
        },
    },
});
publisherSchema.statics.build = (attrs) => {
    return new exports.Publisher(attrs);
};
exports.Publisher = mongoose_1.default.model('Publisher', publisherSchema);
