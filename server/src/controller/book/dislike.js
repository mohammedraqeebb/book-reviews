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
exports.dislikeOrRemoveDislike = exports.removeBookDislikeFromUser = exports.removeUserDislikeFromBook = void 0;
const errors_1 = require("../../errors");
const book_1 = require("../../models/book");
const user_1 = require("../../models/user");
const convert_arrayids_1 = require("../../utils/convert-arrayids");
const likes_1 = require("./likes");
const addUserDisLikeForBook = (book, userId) => __awaiter(void 0, void 0, void 0, function* () {
    book.dislikes.push(userId);
    yield book.save();
    return;
});
const addBookDisLikeForUser = (user, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    user.bookDisLikesIds.unshift(bookId);
    yield user.save();
    return;
});
const removeUserDislikeFromBook = (book, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedLikes = book.likes.filter((currentId) => currentId.toString() !== userId);
    book.likes = updatedLikes;
    yield book.save();
    return;
});
exports.removeUserDislikeFromBook = removeUserDislikeFromBook;
const removeBookDislikeFromUser = (user, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedLikes = user.bookDisLikesIds.filter((currentId) => currentId.toString() !== bookId);
    user.bookDisLikesIds = updatedLikes;
    yield user.save();
    return;
});
exports.removeBookDislikeFromUser = removeBookDislikeFromUser;
const dislikeOrRemoveDislike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookid, variant } = req.params;
    const existingBook = yield book_1.Book.findById(bookid);
    if (!existingBook) {
        throw new errors_1.NotFoundError('book not found');
    }
    const existingUser = yield user_1.User.findById(req.currentUser.id);
    if (!existingUser) {
        throw new errors_1.NotFoundError('user not found error');
    }
    const existingBookDislikes = (0, convert_arrayids_1.convertEachArrayIdToString)(existingBook.dislikes);
    const existingBookLikes = (0, convert_arrayids_1.convertEachArrayIdToString)(existingBook.likes);
    if (variant === 'add') {
        const userDislikeFound = existingBookDislikes.find((id) => id === req.currentUser.id);
        const userLikeFound = existingBookLikes.find((id) => id === req.currentUser.id);
        if (userLikeFound && !userDislikeFound) {
            yield Promise.all([
                (0, likes_1.removeUserLikeFromBook)(existingBook, req.currentUser.id),
                (0, likes_1.removeBookLikeFromUser)(existingUser, bookid),
            ]);
            yield Promise.all([
                addUserDisLikeForBook(existingBook, req.currentUser.id),
                addBookDisLikeForUser(existingUser, bookid),
            ]);
        }
        if (!userDislikeFound && !userLikeFound) {
            yield Promise.all([
                addUserDisLikeForBook(existingBook, req.currentUser.id),
                addBookDisLikeForUser(existingUser, bookid),
            ]);
        }
    }
    else if (variant === 'remove') {
        const userLikeFound = existingBookDislikes.find((id) => id === req.currentUser.id);
        if (userLikeFound) {
            yield Promise.all([
                (0, exports.removeUserDislikeFromBook)(existingBook, req.currentUser.id),
                (0, exports.removeBookDislikeFromUser)(existingUser, bookid),
            ]);
        }
    }
    return res.status(200).send({});
});
exports.dislikeOrRemoveDislike = dislikeOrRemoveDislike;
