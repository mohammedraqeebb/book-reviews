"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rating = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ratingSchema = new mongoose_1.default.Schema({
    rating: {
        type: Number,
        min: 1,
        max: 10,
        required: true,
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    bookId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        },
    },
});
ratingSchema.statics.build = (attrs) => {
    return new exports.Rating(attrs);
};
exports.Rating = mongoose_1.default.model('Rating', ratingSchema);
