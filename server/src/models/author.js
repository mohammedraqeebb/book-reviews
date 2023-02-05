"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Author = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const authorSchema = new mongoose_1.default.Schema({
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
        required: true,
    },
    bio: {
        min: 50,
        type: String,
        max: 1000,
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'user',
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
authorSchema.statics.build = (attrs) => {
    return new exports.Author(attrs);
};
exports.Author = mongoose_1.default.model('Author', authorSchema);
