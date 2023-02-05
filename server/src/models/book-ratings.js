"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRatings = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bookRatingsSchema = new mongoose_1.default.Schema({
    ratings: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Rating' }],
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        },
    },
});
bookRatingsSchema.statics.build = (attrs) => {
    return new exports.BookRatings(Object.assign({ _id: attrs.id }, attrs));
};
exports.BookRatings = mongoose_1.default.model('BookRatings', bookRatingsSchema);
