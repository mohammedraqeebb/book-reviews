"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allComments = exports.getAllComments = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const book_comments_1 = require("../../models/book-comments");
const errors_1 = require("../../errors");
const book_1 = require("../../models/book");
const comment_1 = require("../../models/comment");
const getAllComments = (commentIds, user) => __awaiter(void 0, void 0, void 0, function* () {
    const bookComments = [];
    for (let i = 0; i < commentIds.length; i++) {
        const bookComment = yield comment_1.Comment.findById(commentIds[i].toString()).populate('commentorId');
        if (!bookComment) {
            continue;
        }
        bookComments.push({
            id: bookComment.id,
            comment: bookComment.comment,
            updatedAt: bookComment.updatedAt,
            bookId: bookComment.bookId,
            commentor: {
                //@ts-ignore
                id: bookComment.commentorId.id,
                //@ts-ignore
                name: bookComment.commentorId.name,
            },
        });
    }
    if (!user) {
        return bookComments;
    }
    const userComments = bookComments.filter((currentComment) => currentComment.commentor.id.toString() === user.id);
    const otherComments = bookComments.filter((currentComment) => currentComment.commentor.id.toString() !== user.id);
    return [...userComments, ...otherComments];
});
exports.getAllComments = getAllComments;
const allComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { bookid } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(bookid)) {
        throw new errors_1.BadRequestError('valid bookid is required');
    }
    const existingBook = yield book_1.Book.findById(bookid);
    if (!existingBook) {
        throw new errors_1.NotFoundError('book not found');
    }
    const bookComments = yield book_comments_1.BookComments.findById(bookid);
    if (!bookComments) {
        return res.status(200).send({ comments: [] });
    }
    const bookCommentIds = bookComments.comments;
    const FormattedBookComments = yield (0, exports.getAllComments)(bookCommentIds, (_a = req.currentUser) !== null && _a !== void 0 ? _a : null);
    res.status(200).send({ comments: FormattedBookComments });
});
exports.allComments = allComments;
