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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = void 0;
const comment_1 = require("../../models/comment");
const errors_1 = require("../../errors");
const book_1 = require("../../models/book");
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookid, commentid } = req.params;
    const existingBook = yield book_1.Book.findById(bookid);
    if (!existingBook) {
        throw new errors_1.NotFoundError('product not found');
    }
    const existingComment = yield comment_1.Comment.findById(commentid);
    if (!existingComment) {
        throw new errors_1.NotFoundError('comment not found');
    }
    if (req.currentUser.id !== existingComment.commentorId.toString()) {
        throw new errors_1.UnauthorizedError('you are not authorized to edit');
    }
    yield comment_1.Comment.findByIdAndDelete(existingComment.id);
    res.status(200).send({});
});
exports.deleteComment = deleteComment;
