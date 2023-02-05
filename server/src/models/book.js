"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = exports.Genre = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.Genre = [
    'biography',
    'personality development',
    'comics',
    'horror',
    'fiction',
    'novel',
];
const bookSchema = new mongoose_1.default.Schema({
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
        min: 50,
        max: 300,
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    authorIds: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Author',
            required: true,
        },
    ],
    publisherId: {
        required: true,
        type: mongoose_1.default.Schema.Types.ObjectId,
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
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    dislikes: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    rating: {
        type: Number,
        min: 1,
        max: 10,
    },
    comments: Number,
}, {
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
});
bookSchema.statics.build = (attrs) => {
    return new exports.Book(attrs);
};
exports.Book = mongoose_1.default.model('Book', bookSchema);
