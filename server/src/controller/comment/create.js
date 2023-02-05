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
exports.createComment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const comment_1 = require("../../models/comment");
const book_comments_1 = require("../../models/book-comments");
const errors_1 = require("../../errors");
const book_1 = require("../../models/book");
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookid } = req.params;
    const { comment: userComment } = req.body;
    if (!mongoose_1.default.Types.ObjectId.isValid(bookid)) {
        throw new errors_1.BadRequestError('valid bookid is required');
    }
    const existingBook = yield book_1.Book.findById(bookid);
    if (!existingBook) {
        throw new errors_1.NotFoundError('book not found');
    }
    const comment = comment_1.Comment.build({
        bookId: bookid,
        comment: userComment,
        commentorId: req.currentUser.id,
    });
    yield comment.save();
    const bookComments = yield book_comments_1.BookComments.findById(bookid);
    if (!bookComments) {
        const newBookComments = book_comments_1.BookComments.build({
            id: bookid,
            comments: [comment.id],
        });
        yield newBookComments.save();
        return res.status(201).send({});
    }
    bookComments.comments.push(comment.id);
    yield bookComments.save();
    return res.status(200).send({});
});
exports.createComment = createComment;
