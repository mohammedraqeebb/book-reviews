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
exports.updateComment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const comment_1 = require("../../models/comment");
const errors_1 = require("../../errors");
const book_1 = require("../../models/book");
const updateComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookid, commentid } = req.params;
    const { comment: userComment } = req.body;
    if (!mongoose_1.default.Types.ObjectId.isValid(bookid) &&
        !mongoose_1.default.Types.ObjectId.isValid(commentid)) {
        throw new errors_1.BadRequestError('valid bookid is required');
    }
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
    existingComment.set({ comment: userComment });
    yield existingComment.save();
    return res.status(200).send({});
});
exports.updateComment = updateComment;
