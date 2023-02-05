"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const commentSchema = new mongoose_1.default.Schema({
    bookId: {
        type: mongoose_1.default.Types.ObjectId,
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
        type: mongoose_1.default.Types.ObjectId,
        required: true,
        ref: 'User',
    },
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        },
    },
    timestamps: true,
});
commentSchema.statics.build = (attrs) => {
    return new exports.Comment(attrs);
};
exports.Comment = mongoose_1.default.model('Comment', commentSchema);
