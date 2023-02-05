"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookComments = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bookCommentsSchema = new mongoose_1.default.Schema({
    comments: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Comment' }],
}, {
    toJSON: {
        transform(_, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        },
    },
});
bookCommentsSchema.statics.build = (attrs) => {
    return new exports.BookComments(Object.assign({ _id: attrs.id }, attrs));
};
exports.BookComments = mongoose_1.default.model('BookComments', bookCommentsSchema);
