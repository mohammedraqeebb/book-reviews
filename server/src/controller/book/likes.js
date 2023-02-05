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
exports.LikeOrRemoveLike = exports.removeBookLikeFromUser = exports.removeUserLikeFromBook = void 0;
const errors_1 = require("../../errors");
const book_1 = require("../../models/book");
const user_1 = require("../../models/user");
const convert_arrayids_1 = require("../../utils/convert-arrayids");
const dislike_1 = require("./dislike");
const addUserLikeForBook = (book, userId) => __awaiter(void 0, void 0, void 0, function* () {
    book.likes.push(userId);
    yield book.save();
    return;
});
const addBookLikeForUser = (user, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    user.bookLikesIds.unshift(bookId);
    yield user.save();
    return;
});
const removeUserLikeFromBook = (book, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedLikes = book.likes.filter((currentId) => currentId.toString() !== userId);
    book.likes = updatedLikes;
    yield book.save();
    return;
});
exports.removeUserLikeFromBook = removeUserLikeFromBook;
const removeBookLikeFromUser = (user, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedLikes = user.bookLikesIds.filter((currentId) => currentId.toString() !== bookId);
    user.bookLikesIds = updatedLikes;
    yield user.save();
    return;
});
exports.removeBookLikeFromUser = removeBookLikeFromUser;
const LikeOrRemoveLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookid, variant } = req.params;
    const existingBook = yield book_1.Book.findById(bookid);
    if (!existingBook) {
        throw new errors_1.NotFoundError('book not found');
    }
    const existingUser = yield user_1.User.findById(req.currentUser.id);
    if (!existingUser) {
        throw new errors_1.NotFoundError('user not found error');
    }
    const existingBookLikes = (0, convert_arrayids_1.convertEachArrayIdToString)(existingBook.likes);
    if (variant === 'add') {
        const userDislikeFound = existingBook.dislikes.map((currentId) => currentId.toString() === req.currentUser.id);
        const userLikeFound = existingBookLikes.find((id) => id === req.currentUser.id);
        if (userDislikeFound && !userLikeFound) {
            yield Promise.all([
                (0, dislike_1.removeUserDislikeFromBook)(existingBook, req.currentUser.id),
                (0, dislike_1.removeBookDislikeFromUser)(existingUser, bookid),
            ]);
            yield Promise.all([
                addUserLikeForBook(existingBook, req.currentUser.id),
                addBookLikeForUser(existingUser, bookid),
            ]);
        }
        if (!userLikeFound && !userDislikeFound) {
            yield Promise.all([
                addUserLikeForBook(existingBook, req.currentUser.id),
                addBookLikeForUser(existingUser, bookid),
            ]);
        }
    }
    else if (variant === 'remove') {
        const userLikeFound = existingBookLikes.find((id) => id === req.currentUser.id);
        if (userLikeFound) {
            yield Promise.all([
                (0, exports.removeUserLikeFromBook)(existingBook, req.currentUser.id),
                (0, exports.removeBookLikeFromUser)(existingUser, bookid),
            ]);
        }
    }
    return res.status(200).send({});
});
exports.LikeOrRemoveLike = LikeOrRemoveLike;
